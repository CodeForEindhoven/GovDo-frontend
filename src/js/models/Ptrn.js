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
	var specRelations = [];

	function speculativeRelate(a,b){
		var aid = a.id();
		var bid = b.id();
		specRelations.push({
			value: [
				{
					tid: -1,
					aid: aid,
					bid: bid,
				}
			]
		});
	}

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

		var results = relations.concat(specRelations).filter(function(relation){
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

		specRelations.map(function(rel){
			relate(produceAtom(atoms[rel.value[0].aid]), produceAtom(atoms[rel.value[0].bid]));
		});
		specRelations = [];
	}

	/*CONVENIENCE*/
	function compare(a, b){
		return (a && b && a.id()===b.id());
	}

	/*INTERFACE*/
	function query(q, callback, subset){
		var words = q.split(/ (.+)/);
		var selection = select(words[0], "?", subset);
		//if a callback is provided perform a map
		//otherwise just return the first element
		if(words.length===1){
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
		} else {
			var relations = selection.map(function(atom){
				return selectRelations(atom.oid);
			}).reduce(function(a,b){
				return a.concat(b);
			},[]);
			relations = relations.filter(function(item, pos) {
				return relations.indexOf(item) == pos;
			});
			return query(words[1], callback, relations);
		}

		//var p = parse(q);
		//select(p.type, p.value);
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
			m.redraw();
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
			m.redraw();
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
			m.redraw();
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
	query.transact = transact;

	query.compare = compare;
	query.log = log;


	query.create = create;
	query.findorcreate = findorcreate;
	query.relate = relate;
	query.speculativeRelate = speculativeRelate;

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
