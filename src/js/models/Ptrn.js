var ptrn =  (function(){

	/*ATOM FACTORY*/
	function produceAtom(atom){
		var a = function(q, callback){
			var subset = selectRelations(atom.oid);
			return query(q, callback, subset);
		};

		//write temporary values
		a.update = function(input){
			atom.newvalue = input;
		};

		//drop temporary
		a.drop = function(){
			atom.drop = true;
			atom.newvalue = undefined;
		};

		a.transact = function(){
			if(atom.newvalue !== undefined){
				console.log("transact");
				update(atom.oid, atom.newvalue);
				atom.newvalue = undefined;
				return true;
			}
			return false;
		};

		a.value = function(){
			if(atom.newvalue !== undefined){
				return atom.newvalue;
			}
			return atom.value[0].value;
		};

		a.type = function(){return atom.type;};
		a.id = function(){return atom.oid;};

		return a;
	}

	/*STORE*/
	var atoms = [];
	var relations = [];
	var transactions = 0;

	/*STORAGE FUNCTIONS*/
//	function create(type, value){
//		//push(type, value);
//		var oid = atoms.length;
//		var atom = {
//			oid: oid,
//			type: type,
//			value: [
//				{
//					tid: transactions++,
//					value: value
//				}
//			]
//		};
//		atoms.push(atom);
//		return produceAtom(atom);
//	}

//	function drop(atom){
//		atoms[atom.id()].value.unshift({
//			tid: transactions++,
//			drop: true
//		});
//		return produceAtom(atoms[atom.id()]);
//	}
//
//	function relate(a, b){
//		var aid = a.id();
//		var bid = b.id();
//
//		var rid = relations.length;
//		relations.push({
//			rid: rid,
//			value: [
//				{
//					tid: transactions++,
//					aid: aid,
//					bid: bid,
//				}
//			]
//		});
//	}

//	function unrelate(a,b){
//		var aid = a.id();
//		var bid = b.id();
//
//		relations.filter(function(relation){
//			return ((relation.value[0].aid === aid && relation.value[0].bid === bid) || (relation.value[0].aid === bid && relation.value[0].bid === aid));
//		}).map(function(relation){
//			relations[relation.rid].value.unshift({
//				tid: transactions++,
//				drop: true
//			});
//		});
//	}

//	//convenience create and then relate
//	function createrelate(type, value, a){
//		var b = create(type, value);
//		relate(a, b);
//	}

//	//convenience find one or create it
//	function createorfind(type, value){
//		var find = select(type, value);
//		if(find.length > 0){
//			return produceAtom(find[0]);
//		} else {
//			return create(type, value);
//		}
//	}

	//builds a list of atoms based on matches
	function select(type, value, subset){
		//pull the data
		//pull(type);
		if(!subset){
			subset = atoms;
		}
		return subset.filter(function(atom){
			return (!atom.value[0].drop) && ((type==="?" || type===atom.type) && (value==="?" || value===atom.value[0].value));
		});
	}

	//builds a list of atoms from relations
	function selectRelations(id){
		var results = relations.filter(function(relation){
			return (!relation.value[0].drop) && (relation.value[0].aid === id || relation.value[0].bid === id);
		}).map(function(relation){
			if(relation.value[0].aid === id){
				return atoms[relation.value[0].bid];
			} else {
				return atoms[relation.value[0].aid];
			}
		});
		return results;
	}



	//transacts all the speculative changes
	function transact(){
		atoms.map(function(atom){
			produceAtom(atom).transact();
		});
	}

	/*CONVENIENCE*/
	function compare(a, b){
		return (a && b && a.id()===b.id());
	}

	/*INTERFACE*/
	function query(q, callback, subset){
		var n = parse(q);
		if(n.node==="selector"){
			var selection = select(n.type, n.value, subset);

			//if a callback is provided perform a map
			//otherwise just return the first element
			if(callback){
				return selection.map(function(atom){
					return callback(produceAtom(atom));
				});
			} else {
				if(selection.length > 0){
					return produceAtom(selection[0]);
				}
				return produceAtom({
					oid: -1,
					type: "",
					value: [{
						value: "",
						tid: -1
					}]
				});
			}
		}
		//var p = parse(q);
		//select(p.type, p.value);
	}

	function parse(q){
		var p = 0;
		function token(offset){
			return {
				type: function(type){
					if(tokens[p+offset]){
						return tokens[p+offset].type === type;
					}
					return false;
				},
				value: function(type){
					if(tokens[p+offset]){
						return tokens[p+offset].value;
					}
					return false;
				}
			};
		}

		function selector(){
			var type = "";
			var value = "";
			var tv = false;
			if(token(0).type("word")||token(0).type("string")||token(0).type("wildcard")){
				type = token(0).value();

				if(token(1).type("typevalue")){
					if(token(2).type("word")||token(2).type("string")||token(2).type("wildcard")){
						value = token(2).value();
						return {
							node: "selector",
							type: type,
							value: value
						};
					}
				} else {
					return {
						node: "selector",
						type: type,
						value: "?"
					};
				}

			} else {
				return false;
			}
		}

		var tokens = tokenize(q);
		return selector();
	}

	function tokenize(q){
		var chars = q.split("");
		var tokens = [];
		var token = {
			value: "",
			type: ""
		};

		function newToken(v,t){
			token.value = v;
			token.type = t;
		}

		function writeToken(v){
			token.value = token.value + v;
		}

		function pushToken(){
			tokens.push({
				value: token.value,
				type: token.type,
			});
			token.value = "";
			token.type = "";
		}

		for(var i=0; i<chars.length; i++){
			var c = chars[i];

			//state new token
			if(token.type === "") { //state = new token
				if(c===":"){
					newToken(c, "typevalue");
					pushToken();
				} else if(c==="?"){
					newToken(c, "wildcard");
					pushToken();
				} else if(c==="'"){
					newToken("", "string");
				} else {
					newToken(c, "word");
				}
				continue;
			}

			//state inside string
			if(token.type === "string") {
				if(c==="'"){
					pushToken();
				} else {
					writeToken(c);
				}
				continue;
			}

			//state inside word
			if(token.type === "word") {
				if(c===" "){
					pushToken();
				} else if(c===":" || c==="?"){
					pushToken();
					i--;
				} else {
					writeToken(c);
				}
				continue;
			}
		}

		if(token.type !== ""){
			pushToken();
		}

		return tokens;

	}

	function log(){
		console.log(atoms);
		console.log(relations);
	}

	/*NETWORK*/
	var cache = {};

	function pulldump(){
		request("GET", "dump", {}, function(data){
			data.nodes.map(function(elem){
				atoms[elem.id] = {
					oid: elem.id,
					type: elem.type,
					value: [
						{
							tid: elem.tid,
							value: elem.value
						}
					]
				};
			});

			data.relations.map(function(rel){
				relations[rel.tid] = {
					value: [
						{
							tid: rel.tid,
							aid: rel.aid,
							bid: rel.bid,
						}
					]
				};
			});

			m.redraw();
		});
	}

	function create(type, value, callback){
		request("POST", "create", {
			type: type,
			value: value
		}, function(elem){
			if(!atoms[elem.id]){
				atoms[elem.id] = {
					oid: elem.id,
					type: elem.type,
					value: [
						{
							tid: elem.tid,
							value: elem.value
						}
					]
				};
			}

			callback(produceAtom(atoms[elem.id]));
		});
	}

	function findorcreate(type, value, callback){
		request("POST", "findorcreate", {
			type: type,
			value: value
		}, function(elem){
			if(!atoms[elem.id]){
				atoms[elem.id] = {
					oid: elem.id,
					type: elem.type,
					value: [
						{
							tid: elem.tid,
							value: elem.value
						}
					]
				};
			}

			callback(produceAtom(atoms[elem.id]));
		});
	}


	function update(id, value){
		request("POST", "update/"+id, {
			value: value
		}, function(elem){
			atoms[elem.id].value.unshift({
				tid: elem.tid,
				value: elem.value
			});
			m.redraw();
		});
	}


	function relate(a, b){
		var aid = a.id();
		var bid = b.id();

		request("POST", "relate", {
			aid: aid,
			bid: bid
		}, function(rel){
			relations[rel.tid] = {
				value: [
					{
						tid: rel.tid,
						aid: rel.aid,
						bid: rel.bid,
					}
				]
			};
		});
	}

	function pull(type){
		if(!cache[type]){
			console.log("pull:  "+type);
			cache[type] = true;

			request("GET", "select/"+type, {}, function(data){
				data.map(function(elem){
					if(!atoms[elem.id]){
						atoms[elem.id] = {
							oid: elem.id,
							type: elem.type,
							value: [
								{
									tid: elem.tid,
									value: elem.value
								}
							]
						};
					}

					elem.collection.map(function(rel){
						if(!relations[rel.tid]){
							relations[rel.tid] = {
								value: [
									{
										tid: rel.tid,
										aid: rel.aid,
										bid: rel.bid,
									}
								]
							};
						}
					});

					if(elem.tid>transactions){
						transactions = elem.tid;
					}
					m.redraw();
				});
			});
		} else {
			console.log("cache: "+type);
		}
	}

	function relpul(id){
		request("GET", "relation/"+id, {}, function(data){
			data.map(function(elem){
				if(!atoms[elem.id]){
					atoms[elem.id] = {
						oid: elem.id,
						type: elem.type,
						value: [
							{
								tid: elem.tid,
								value: elem.value
							}
						]
					};
				}

				relations[elem.rid] = {
					value: [
						{
							tid: elem.tid,
							aid: id,
							bid: elem.id,
						}
					]
				};

				if(elem.rid>transactions){
					transactions = elem.tid;
				}
				m.redraw();
			});
		});
	}

	function request(type, url, data, callback){
		var api = "http://localhost:9000/";
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				callback(JSON.parse(this.responseText));
			}
		};
		xhttp.open(type, api+url, true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(JSON.stringify(data));
	}


	/*PUBLIC INTERFACE*/
	//query.create = create;
	//query.drop = drop;
	//query.relate = relate;
	//query.unrelate = unrelate;

	//query.createrelate = createrelate;
	//query.createorfind = createorfind;

	query.transact = transact;

	query.compare = compare;
	query.log = log;


	query.create = create;
	query.findorcreate = findorcreate;
	query.relate = relate;

	pulldump();
	//query.push = push;
	return query;
})();

/*
model.get("overview", {}, function(data){
	data.map(function(domain){
		ptrn.create("domain", domain.name, function(d){
			domain.Programs.map(function(program){
				ptrn.create("program", program.name, function(p){
					ptrn.relate(d,p);
					ptrn.create("mission", program.mission, function(a){ptrn.relate(p,a);});
					ptrn.create("order", program.id, function(a){ptrn.relate(p,a);});
					ptrn.create("mode", program.mode, function(a){ptrn.relate(p,a);});

					program.Tasks.map(function(task){
						ptrn.create("task", task.name, function(t){
							ptrn.relate(p,t);
							ptrn.create("means", task.means, function(a){ptrn.relate(t,a);});
							ptrn.create("kpi", task.kpi, function(a){ptrn.relate(t,a);});
							ptrn.create("order", task.id, function(a){ptrn.relate(t,a);});
							ptrn.create("mode", task.mode, function(a){ptrn.relate(t,a);});

							task.Efforts.map(function(effort){
								ptrn.create("effort", effort.name, function(e){
									ptrn.relate(t,e);
									ptrn.create("description", effort.description, function(a){ptrn.relate(e,a);});
									ptrn.create("endproduct", effort.endproduct, function(a){ptrn.relate(e,a);});
									ptrn.create("type", effort.type, function(a){ptrn.relate(e,a);});
									ptrn.create("order", effort.id, function(a){ptrn.relate(e,a);});
									ptrn.create("mode", effort.mode, function(a){ptrn.relate(e,a);});

									effort.People.map(function(person){
										ptrn.findorcreate("person", person.name, function(p){ptrn.relate(p,e);});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});
*/

//model.get("overview", {}, function(data){
//	data.map(function(domain){
//		var d = ptrn.create("domain", domain.name);
//		domain.Programs.map(function(program){
//			var p = ptrn.create("program", program.name);
//			ptrn.createrelate("mission", program.mission, p);
//			ptrn.createrelate("order", program.id, p);
//
//			ptrn.relate(d,p);
//			program.Tasks.map(function(task){
//				var t = ptrn.create("task", task.name);
//				ptrn.createrelate("means", task.means, t);
//				ptrn.createrelate("kpi", task.kpi, t);
//				ptrn.createrelate("order", task.id, t);
//				ptrn.createrelate("mode", task.mode, t);
//
//				ptrn.relate(p,t);
//				task.Efforts.map(function(effort){
//					var e = ptrn.create("effort", effort.name);
//					ptrn.createrelate("description", effort.description, e);
//					ptrn.createrelate("endproduct", effort.endproduct, e);
//					ptrn.createrelate("type", effort.type, e);
//					ptrn.createrelate("order", effort.id, e);
//					ptrn.createrelate("mode", effort.mode, e);
//					ptrn.relate(t,e);
//
//					effort.People.map(function(person){
//						var p = ptrn.createorfind("person", person.name);
//						ptrn.relate(p,e);
//					});
//				});
//			});
//		});
//	});
//});
