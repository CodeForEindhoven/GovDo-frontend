var ptrn = (function(){

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

		pub.reifyspeculativetransactions = function(updates){
			//update transactions
			speculativetransactions.map(function(transaction, count){
				transaction.node.value = transaction.node.value.map(function(v){
					if(v.tid===transaction.tid){
						v.tid = updates.newtransactions[count].tid;
					}
					return v;
				});
				transaction.tid = updates.newtransactions[count].tid;
				transaction.time = updates.newtransactions[count].time;

				transactions[transaction.tid] = transaction;
			});
			speculativetransactions = [];

			for(var i in updates.speculativeids){
				var oldid = parseInt(i);
				var newid = updates.speculativeids[i];

				//update all aid in atoms
				var hold = JSON.parse(JSON.stringify(atoms[oldid]));
				hold.aid = newid;
				delete atoms[oldid];
				atoms[newid] = hold;

				//relationmap
				var holdmap = JSON.parse(JSON.stringify(relationmap[oldid]));
				delete relationmap[oldid];
				relationmap[newid] = holdmap;
				relationmap[newid].map(function(other){
					relationmap[other] = relationmap[other].map(function(self){
						if(self===oldid){return newid;}
						return self;
					});
				});
			}
			//update rels
			relations = relations.map(function(rel){
				if(rel.aid<0){rel.aid = updates.speculativeids[rel.aid];}
				if(rel.bid<0){rel.bid = updates.speculativeids[rel.bid];}
				return rel;
			});
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

		pub.createatom = function(tid, type, value){
			var aid = atomCount++;
			if(tid<0){
				aid = -(aid);
			}
			return pub.writeatom(aid, tid, type, value);
		};

		pub.dropatom = function(aid, tid){
			atoms[aid].value.push({
				tid: tid,
				drop: true
			});
			atoms[aid].value.sort(function(a,b){
				return Math.abs(b.tid)-Math.abs(a.tid);
			});
			pub.unmaptypeatom(atoms[aid].type, atoms[aid]);
			return atoms[aid];
		};

		pub.writerelation = function(tid, aid, bid, value){
			//if relation exists use that
			var found = relations.find(function(rel){
				return ((rel.aid===aid && rel.bid===bid) || (rel.aid===bid && rel.bid===aid));
			});
			if(found){
				rid = found.rid;
			} else {
				rid = relationCount++;
			}

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

		pub.gettransactions = function(){
			return transactions;
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
			return storage.transact(function(tid){
				return storage.createatom(tid, type, value);
			});
		};

		pub.updateatom = function(aid, value){
			return storage.transact(function(tid){
				return storage.writeatom(aid, tid, "", value);
			});
		};

		pub.relate = function(aid, bid, value){
			return storage.transact(function(tid){
				return storage.writerelation(tid, aid, bid, value);
			});
		};

		pub.dropatom = function(aid){
			return storage.transact(function(tid){
				return storage.dropatom(aid, tid);
			});
		};

		pub.consume = function(transactions){
			var speculativeids = {};
			var newtransactions = transactions.map(function(t){
				var newtransaction;
				if(t.transaction === "create") {
					newtransaction = pub.createatom(t.type, t.value);
					speculativeids[t.aid] = newtransaction.node.aid;
					return newtransaction;
				} else if(t.transaction === "update") {
					if(t.aid < 0) {t.aid = speculativeids[t.aid];}
					return pub.updateatom(t.aid, t.value);
				} else if(t.transaction === "drop") {
					if(t.aid < 0) {t.aid = speculativeids[t.aid];}
					return pub.dropatom(t.aid);
				} else if(t.transaction === "relate") {
					if(t.aid < 0) {t.aid = speculativeids[t.aid];}
					if(t.bid < 0) {t.bid = speculativeids[t.bid];}
					return pub.relate(t.aid, t.bid, t.value);
				}
			});
			console.log(speculativeids);
			console.log(newtransactions);
			return {
				speculativeids: speculativeids,
				newtransactions: newtransactions
			};
		};

		pub.publish = function(){
			return storage.gettransactions().map(function(t){
				if(t.node.rid !== undefined){
					return {
						transaction: "relate",
						value: t.value.value,
						aid: t.node.aid,
						bid: t.node.bid
					};
				} else {
					if(t.node.value.length===1){
						return {
							transaction: "create",
							value: t.value.value,
							type: t.node.type,
							aid: t.node.aid
						};
					} else {
						if(t.value.drop){
							return {
								transaction: "drop",
								aid: t.node.aid,
							};
						} else {
							return {
								transaction: "update",
								aid: t.node.aid,
								value: t.value.value,
							};
						}
					}
				}
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

		pub.updateatom = function(aid, value){
			if(storage.getatom(aid).value[0].tid<0){
				return storage.overwriteatom(aid, value);
			} else {
				storage.speculativetransact(function(tid){
					return storage.writeatom(aid, tid, "", value);
				});
			}
		};

		pub.relate = function(aid, bid, value){
			storage.speculativetransact(function(tid){
				return storage.writerelation(tid, aid, bid, value);
			});
		};

		pub.dropatom = function(aid){
			storage.speculativetransact(function(tid){
				return storage.dropatom(aid, tid);
			});
		};

		pub.reify = function(updates){
			storage.reifyspeculativetransactions(updates);
		};

		pub.publish = function(){
			network.publish(storage.getspeculativetransactions().map(function(t){
				if(t.node.rid !== undefined){
					return {
						transaction: "relate",
						value: t.value.value,
						aid: t.node.aid,
						bid: t.node.bid
					};
				} else {
					if(t.node.value.length===1){
						return {
							transaction: "create",
							value: t.value.value,
							type: t.node.type,
							aid: t.node.aid
						};
					} else {
						if(t.value.drop){
							return {
								transaction: "drop",
								aid: t.node.aid,
							};
						} else {
							return {
								transaction: "update",
								aid: t.node.aid,
								value: t.value.value,
							};
						}
					}
				}
			}));
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

		q.consume = transactor.consume;
		q.dump = transactor.publish;
		return q;
	})();

	//network, responsible for syncing with the backend
	var network = (function(){
		var pub = {};
		var callbacks = {
			onpublish: []
		};

		pub.publish = function(value){
			callbacks.onpublish.map(function(c){
				c(value);
			});
		};

		pub.onpublish = function(callback){
			callbacks.onpublish.push(callback);
		};

		return pub;
	})();

	network.onpublish(function(transaction){
		console.log(transaction);
		m.request({
			method: "POST",
			url: config.api_endpoint+"/transact",
			data: transaction
		})
		.then(function(result) {
			speculator.reify(result);
		});
	});

	m.request({
		method: "GET",
		url: config.api_endpoint+"/dump",
	})
	.then(function(result) {
		transactor.consume(result);
		console.log(selector.getatomsbytype("cheese")[1].value());
	});
//	speculator.createatom("cheese", "red");
//	speculator.createatom("cheese", "purple");
//	speculator.updateatom(-1, "blue");
//	speculator.relate(-0,-1, true);
//
//	speculator.publish();



	return query;
})();
