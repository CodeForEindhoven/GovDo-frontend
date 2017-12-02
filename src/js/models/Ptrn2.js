var ptrn2 = (function(){

	//storage, is responsible for quickly storing and retreiving data
	var storage = (function(){

		var pub = {};

		var transactions = [];
		var speculativetransactions = [];

		var atoms = [];
		var atomCount = 0;
		var relations = [];
		var relationCount = 0;

		var typemap = {};
		var relationmap = {};

		pub.transact = function(callback){
			var atom = {
				tid: transactions.length,
				time: new Date()
			};

			atom.node = callback(atom.tid);
			atom.value = atom.node.value[0];
			transactions.push(atom);
			return atom;
		};

		pub.speculativetransact = function(callback){
			var atom = {
				tid: -(transactions.length+speculativetransactions.length),
				time: new Date()
			};

			atom.node = callback(atom.tid);
			atom.value = atom.node.value[0];
			speculativetransactions.push(atom);
			return atom;
		};

		pub.writeatom = function(aid, tid, type, value){
			if(!atoms[aid]) {
				atoms[aid] = {
					aid: aid,
					type: type,
					value: [{
						tid: tid,
						value: value
					}]
				};
				pub.maptypeatom(type, atoms[aid]);
			} else {
				atoms[aid].value.push({
					tid: tid,
					value: value
				});
				atoms[aid].value.sort(function(a,b){
					return Math.abs(b.tid)-Math.abs(a.tid);
				});
			}
			return atoms[aid];
		};

		pub.overwriteatom = function(aid, value){
			if(atoms[aid]) {
				atoms[aid].value[0].value = value;
			}
			return atoms[aid];
		};

		pub.dropatom = function(aid, tid){
			atoms[aid].value.push({
				tid: tid,
				drop: true
			});
			pub.unmaptypeatom(atoms[aid].type, atoms[aid]);
		};

		pub.createatom = function(tid, type, value){
			return pub.writeatom(atomCount++, tid, type, value);
		};

		pub.writerelation = function(rid, tid, aid, bid, value){
			if(!relations[rid]) {
				relations[rid] = {
					rid: rid,
					aid: aid,
					bid: bid,
					value: [{
						tid: tid,
						value: value
					}]
				};
			} else {
				relations[rid].value.push({
					tid: tid,
					value: value
				});
				relations[rid].value.sort(function(a,b){
					return Math.abs(b.tid)-Math.abs(a.tid);
				});
			}

			if(value){
				pub.maprelation(aid, bid);
			} else {
				pub.unmaprelation(aid, bid);
			}
			return relations[rid];
		};

		pub.createrelation = function(tid, aid, bid, value){
			return pub.writerelation(relationCount++, tid, aid, bid, value);
		};

		//maps
		pub.maptypeatom = function(type, atom){
			if(!typemap[type]){
				typemap[type] = [];
			}
			typemap[type].push(atom);
		};

		pub.unmaptypeatom = function(type, atom){
			if(typemap[type]){
				typemap[type] = typemap[type].filter(function(other){
					return (other.aid !== atom.aid);
				});
			}
		};

		pub.maprelation = function(aid, bid){
			if(!relationmap[aid]){relationmap[aid] = [];}
			if(!relationmap[aid].find(function(other){
				return other === bid;
			})){
				relationmap[aid].push(bid);
			}

			if(!relationmap[bid]){relationmap[bid] = [];}
			if(!relationmap[bid].find(function(other){
				return other === aid;
			})){
				relationmap[bid].push(aid);
			}
		};

		pub.unmaprelation = function(aid, bid){
			if(!relationmap[aid]){relationmap[aid] = [];}
			relationmap[aid] = relationmap[aid].filter(function(other){
				return other !== bid;
			});

			if(!relationmap[bid]){relationmap[bid] = [];}
			relationmap[bid] = relationmap[bid].filter(function(other){
				return other !== aid;
			});
		};

		//read
		pub.getspeculativetransactions = function(){
			return speculativetransactions;
		};

		pub.getatom = function(aid){
			if(atoms[aid] && !atoms[aid].value[0].drop){
				return atoms[aid];
			} else {
				return undefined;
			}
		};

		pub.getatomsbytype = function(type){
			return typemap[type];
		};

		pub.getrelations = function(aid){
			return relationmap[aid].map(function(bid){
				return pub.getatom(bid);
			}).filter(function(b){
				return b !== undefined;
			});
		};

		pub.getrelationsbytype = function(aid, type){
			return pub.getrelations(aid).filter(function(b){
				return b.type === type;
			});
		};

		return pub;
	})();

	//transactor, responsible for writing new data
	var transactor = (function(){
		var pub = {};

		pub.createatom = function(type, value){
			storage.transact(function(tid){
				return storage.createatom(tid, type, value);
			});
		};

		pub.updateatom = function(aid, type, value){
			storage.transact(function(tid){
				return storage.writeatom(aid, tid, type, value);
			});
		};

		pub.relate = function(aid, bid){
			storage.transact(function(tid){
				return storage.relate(tid, aid, bid, value);
			});
		};

		return pub;
	})();


	//speculator responsible for writing temporary changes
	var speculator = (function(){
		var pub = {};

		pub.createatom = function(type, value){
			storage.speculativetransact(function(tid){
				return storage.createatom(tid, type, value);
			});
		};

		pub.updateatom = function(aid, type, value){
			if(storage.getatom(aid).value[0].tid<0){
				return storage.overwriteatom(aid, value);
			} else {
				storage.speculativetransact(function(tid){
					return storage.writeatom(aid, tid, type, value);
				});
			}
		};

		pub.relate = function(aid, bid){
			storage.speculativetransact(function(tid){
				return storage.relate(tid, aid, bid, value);
			});
		};

		pub.publish = function(){
			return storage.getspeculativetransactions().map(function(t){
				if(t.node.aid){
					return {
						transaction: "atom",
						value: t.value.value
					};
				}
			});
		};

		return pub;
	})();

	//selector, responsible for getting data from storage and transforming to public api
	var selector = (function(){
		var pub = {};

		pub.getatombyid = function(id){
			return atomfactory.produce(storage.getatom(id));
		};

		pub.getatomsbytype = function(type){
			return storage.getatomsbytype(type).map(function(atom){
				return atomfactory.produce(atom);
			});
		};

		pub.getrelationsbytype = function(atom, type){
			return storage.getrelationsbytype(atom.id(), type).map(function(atom){
				return atomfactory.produce(atom);
			});
		};

		return pub;
	})();

	//responsible for transforming individual atoms to public api
	var atomfactory = (function(){
		var pub = {};

		pub.produce = function(atom){
			var a = function(q, callback){

			};

			a.value = function(){
				return atom.value[0].value;
			};

			a.type = function(){return atom.type;};
			a.id = function(){return atom.aid;};

			return a;
		};

		return pub;
	})();

	//query
	var query = (function(){
		var q = function(input, callback){
			var words = q.split(/ (.+)/);
			var first = words[0];
		};
	})();

	//network, responsible for syncing with the backend
	var network = (function(){
		var pub = {};
		var callbacks = {
			ontransact: []
		};

		pub.transact = function(value){
			callbacks.ontransact.map(function(c){
				c(value);
			});
		};

		pub.ontransact = function(callback){
			callbacks.ontransact.push(callback);
		};

		return pub;
	})();

	network.ontransact(function(transaction){
		console.log(transaction);
	});

	transactor.createatom("cheese", "blue");
	transactor.createatom("cheese", "green");
	speculator.createatom("cheese", "purple");
	speculator.updateatom(2, "cheese", "test");
	speculator.updateatom(1, "cheese", "test");
	console.log(speculator.publish());


	console.log(selector.getatomsbytype("cheese"));
})();
