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
			if(atom.drop===true){
				drop(atom.oid);
			} else if(atom.newvalue !== undefined){
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
	//type map
	var typemap = {};
	var relationmap = {};

	function createRelation(aid, bid, tid){
		var newrel = {
			value: [
				{
					tid: tid,
					aid: aid,
					bid: bid,
				}
			]
		};
		relations.push(newrel);

		if(!relationmap[aid]){relationmap[aid] = [];}
		relationmap[aid].push(newrel);
		if(!relationmap[bid]){relationmap[bid] = [];}
		relationmap[bid].push(newrel);
	}

	function speculativeRelate(a,b){
		var aid = a.id();
		var bid = b.id();

		var found = relations.filter(function(relation){
			return (!relation.value[0].drop) && ((relation.value[0].aid === aid && relation.value[0].bid === bid) || (relation.value[0].aid === bid && relation.value[0].bid === aid));
		});
		console.log("relate");
		console.log(found);

		if(found.length === 0){
			createRelation(aid, bid, -1);
		}
	}

	function speculativeUnrelate(a,b){
		var aid = a.id();
		var bid = b.id();

		var found = relations.filter(function(relation){
			return (!relation.value[0].drop) && ((relation.value[0].aid === aid && relation.value[0].bid === bid) || (relation.value[0].aid === bid && relation.value[0].bid === aid));
		});
		console.log("unrelate");
		console.log(found);

		if(found.length > 0){
			found[0].value.unshift({
				tid: -1,
				drop: true,
				aid: aid,
				bid: bid,
			});
		}
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
		var results = [];
		if(relationmap[id]){
			results = relationmap[id].filter(function(rel){
				return (!rel.value[0].drop);
			}).map(function(rel){
				if(rel.value[0].aid===id){
					return atoms[rel.value[0].bid];
				}
				return atoms[rel.value[0].aid];
			});
		}
		return results;
		/*
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
		*/
	}



	//transacts all the speculative changes
	function transact(){
		atoms.map(function(atom){
			produceAtom(atom).transact();
		});

		var updaterelations = relations.filter(function(rel){
			return (rel.value[0].tid===-1);
		});

		relations = relations.filter(function(rel){
			return (rel.value[0].tid!==-1);
		});

		updaterelations.filter(function(rel){
			return (rel.value[0].tid===-1);
		}).map(function(rel){
			if(rel.value[0].drop){
				unrelate(produceAtom(atoms[rel.value[0].aid]), produceAtom(atoms[rel.value[0].bid]));
			} else {
				relate(produceAtom(atoms[rel.value[0].aid]), produceAtom(atoms[rel.value[0].bid]));
			}
		});


	}

	/*CONVENIENCE*/
	function compare(a, b){
		return (a && b && a.id()===b.id());
	}

	/*INTERFACE*/
	function query(q, callback, subset){
		var selection;

		if(!subset){
			subset = atoms;
		}

		var words = q.split(/ (.+)/);
		var first = words[0];

		if(first.charAt(0)==="#"){
			var id = parseInt(first.substring(1));
			selection = [];
			var found = subset.find(function(a){
				return a && a.oid === id;
			});
			if(found) selection.push(found);
		} else {
			var type = first.split(":");
			var value = "?";
			if(type.length>1){
				value = type[1];
			}

			type = type[0];
			selection = select(type, value, subset);
		}


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
						tid: -1,
						value: ""
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
		console.log(typemap);
		console.log(relationmap);
	}

	/*NETWORK*/
	var cache = {};

	function pulldump(callback){
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

				if(!typemap[elem.type]){typemap[elem.type] = [];}
				typemap[elem.type].push(elem.id);

			});

			data.relations.map(function(rel){
				createRelation(rel.aid, rel.bid, rel.tid);
			});

			callback();
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

	function createrelate(type, value, b, callback){
		var bid = b.id();
		request("POST", "createrelate", {
			type: type,
			value: value,
			bid: bid,
		}, function(response){
			var elem = response.node;
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

			var rel = response.relation;
			createRelation(rel.aid, rel.bid, rel.tid);
			callback(produceAtom(atoms[elem.id]));
			m.redraw();
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

	function drop(id){
		request("DELETE", "drop/"+id, {}, function(elem){
			atoms[elem.id].value.unshift({
				tid: elem.tid,
				drop: true
			});
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

	function relate(a, b, callback){
		var aid = a.id();
		var bid = b.id();

		request("POST", "relate", {
			aid: aid,
			bid: bid
		}, function(rel){
			createRelation(rel.aid, rel.bid, rel.tid);
			if(callback) callback();
			m.redraw();
		});
	}

	function unrelate(a, b){
		var aid = a.id();
		var bid = b.id();

		request("POST", "unrelate", {
			aid: aid,
			bid: bid
		}, function(rel){});
	}

	function request(type, url, data, callback){
		var api = config.api_endpoint;
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				callback(JSON.parse(this.responseText));
			}
		};
		xhttp.open(type, api+url, true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(JSON.stringify(data));

		//if (xhttp.readyState == 4 && xhttp.status == 200) {
		//	callback(JSON.parse(xhttp.responseText));
		//}
	}

	function loginUser(user, callback){
		request("POST", "user/hash", {
			name: user
		}, function(resp){
			callback(resp.succes);
		});
	}

	function loginPass(user, pass, callback){
		request("POST", "user/check", {
			name: user,
			pass: pass
		}, function(resp){
			callback(resp.succes, resp.node, resp.role);
		});
	}

	function users(users, callback){
		request("GET", "users", {
		}, function(resp){
			callback(resp);
		});
	}


	/*PUBLIC INTERFACE*/
	query.transact = transact;

	query.compare = compare;
	query.log = log;

	query.create = create;
	query.findorcreate = findorcreate;
	query.relate = relate;
	query.createrelate = createrelate;
	query.speculativeRelate = speculativeRelate;
	query.speculativeUnrelate = speculativeUnrelate;
	query.loadall = pulldump;

	//quey login
	query.loginuser = loginUser;
	query.loginpass = loginPass;
	query.users = users;

	//query.push = push;
	return query;
})();


function asyncmap(array, next, done){
	var i = -1;
	function step(){
		i++;
		if(array.length > i){
			next(array[i],step);
		} else {
			if(done) done();
		}
	}
	step();
}

function pushAllTheDataSync(){
	var commands = [];
	model.get("overview", {}, function(data){
		var programcount = 0;
		var taskcount = 0;
		var effortcount = 0;
		asyncmap(data, function(domain, nextdomain){
			ptrn.create("domain", domain.name, function(d){

				//Programs
				asyncmap(domain.Programs, function(program, nextprogram){
					programcount++;
					taskcount = 0;
					effortcount = 0;
					ptrn.createrelate("program", program.name, d, function(p){
						ptrn.createrelate("mission", program.mission, p, function(){
						ptrn.createrelate("order", programcount, p, function(){

							//Tasks
							asyncmap(program.Tasks, function(task, nexttask){
								taskcount++;
								effortcount = 0;
								ptrn.createrelate("task", task.name, p, function(t){
									ptrn.createrelate("means", task.means, t, function(){
									ptrn.createrelate("order", taskcount, t, function(){
									ptrn.createrelate("kpi", task.kpi, t, function(){
									ptrn.createrelate("mode", task.mode, t, function(){

										//Efforts
										asyncmap(task.Efforts, function(effort, nexteffort){
											effortcount++;
											ptrn.createrelate("effort", effort.name, t, function(e){
												ptrn.createrelate("description", effort.description, e, function(){
												ptrn.createrelate("endproduct", effort.endproduct, e, function(){
												ptrn.createrelate("type", effort.type, e, function(){
												ptrn.createrelate("order", effortcount, e, function(){
												ptrn.createrelate("mode", effort.mode, e, function(){
												ptrn.createrelate("startdate", "_/_/_", e, function(){
												ptrn.createrelate("enddate", "_/_/_", e, function(){

													//People
													asyncmap(effort.People, function(person, nextperson){
														ptrn.findorcreate("person", person.name, function(p){
															ptrn.relate(p,e, function(){
																nextperson();
															});
														});
													}, nexteffort);
												});});});});});});});
											});
										},nexttask);
									});});});});
								});
							}, nextprogram);
						});});
					});
				}, nextdomain);
			});
		});
	});
}

/*
function pushAllTheData(){
	model.get("overview", {}, function(data){
		var programcount = 0;
		data.map(function(domain){
			ptrn.create("domain", domain.name, function(d){
				domain.Programs.map(function(program){
					programcount++;
					ptrn.create("program", program.name, function(p){
						ptrn.relate(d,p);
						ptrn.createrelate("mission", program.mission, p);
						ptrn.createrelate("order", programcount, p);
						ptrn.createrelate("mode", program.mode, p);

						program.Tasks.map(function(task, taskcount){
							ptrn.create("task", task.name, function(t){
								ptrn.relate(p,t);
								ptrn.createrelate("means", task.means, t);
								ptrn.createrelate("kpi", task.kpi, t);
								ptrn.createrelate("order", taskcount+1, t);
								ptrn.createrelate("mode", task.mode, t);

								task.Efforts.map(function(effort, effortcount){
									ptrn.create("effort", effort.name, function(e){
										ptrn.relate(t,e);
										ptrn.createrelate("description", effort.description, e);
										ptrn.createrelate("endproduct", effort.endproduct, e);
										ptrn.createrelate("type", effort.type, e);
										ptrn.createrelate("order", effortcount+1, e);
										ptrn.createrelate("mode", effort.mode, e);

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
}
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
