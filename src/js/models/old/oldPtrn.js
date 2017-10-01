var ptrn = (function(){

	/*STORE*/
	var atoms = [];
	var relations = [];
	var transactions = 0;

	/*PRIMITIVES*/
	//Atom
	var Atom = function(a){
		this.atom = a;
	};

	Atom.prototype.value = function(){
		return this.atom.value[0].value;
	};

	Atom.prototype.type = function(){
		return this.atom.type;
	};

	Atom.prototype.id = function(){
		return this.atom.oid;
	};

	Atom.prototype.relations = function(type){
		if(type){
			return selectRelations(this.atom.oid).select(type, "?");
		}
		return selectRelations(this.atom.oid);
	};

	//Empty
	var Empty = function(){};

	Empty.prototype.value = function(){
		return undefined;
	};

	Empty.prototype.type = function(){
		return undefined;
	};

	Empty.prototype.id = function(){
		return undefined;
	};

	Empty.prototype.relations = function(type){
		return undefined;
	};


	//Collections
	var Collection = function(c){
		if(c !== undefined){
			this.collection = c;
		} else {
			c = [];
		}
	};

	Collection.prototype.select = function(type, value){
		var result = this.collection.filter(function(atom){
			return (type==="?" || type===atom.type()) && (value==="?" || value===atom.value());
		});
		return new Collection(result);
	};

	Collection.prototype.relations = function(type){
		var result = this.collection.map(function(atom){
			return atom.relations(type);
		});

		return new Collection(result);
	};

	Collection.prototype.map = function(callback){
		var result = this.collection.map(callback);
		return result;
	};

	Collection.prototype.first = function(){
		if(this.collection.length > 0) {
			return this.collection[0];
		} else {
			return new Empty();
		}

	};

	Collection.prototype.last = function(){
		return this.collection[this.collection.length];
	};

	Collection.prototype.nth = function(index){
		return this.collection[index];
	};

	/*INTERFACE*/

	//instantiation
	//creates an atom
	function create(type, value){
		var oid = atoms.length;
		atoms.push({
			oid: oid,
			type: type,
			value: [
				{
					tid: transactions++,
					value: value
				}
			]
		});
		return oid;
	}

	function write(oid, type, value){
		atoms[oid] = {
			oid: oid,
			type: type,
			value: [
				{
					tid: transactions++,
					value: value
				}
			]
		};
		return oid;
	}

	//creates a relation
	function relate(aid, bid){
		var rid = relations.length;
		relations.push({
			rid: rid,
			value: [
				{
					tid: transactions++,
					aid: aid,
					bid: bid,
				}
			]
		});
	}

	function createrelate(type, value, aid){
		var bid = create(type, value);
		relate(aid, bid);
	}

	function createorfind(type, value){
		var find = select(type, value).first();
		if(find.value() !== undefined){
			return find.id();
		} else {
			return create(type, value);
		}
	}

	//query functions
	//select atoms with a certain value
	function select(type, value){

		pullEvent(type, value);

		var results = atoms.filter(function(atom){
			return (type==="?" || type===atom.type) && (value==="?" || value===atom.value[0].value);
		}).map(function(atom){
			return new Atom(atom);
		});
		return new Collection(results);
	}

	function find(type, value){
		return select(type, value).first();
	}

	function selectRelations(id){
		var results = relations.filter(function(relation){
			return (relation.value[0].aid === id || relation.value[0].bid === id);
		}).map(function(relation){
			if(relation.value[0].aid === id){
				return new Atom(atoms[relation.value[0].bid]);
			} else {
				return new Atom(atoms[relation.value[0].aid]);
			}
		});
		return new Collection(results);
	}

	/*EVENT HANDLERS*/
	var pullEvent = function(){};

	function onPull(callback){
		pullEvent = callback;
	}

	function log(){
		console.log(transactions);
		console.log(atoms);
		console.log(relations);
	}

	//Query parser
	function query(q, callback){
		var p = parse(q);
		select(p.type, p.value).map(callback);
	}

	function parse(q){
		var tokens = q.split(":");
		var type = "?";
		var value = "?";
		if(tokens[0]){type = tokens[0];}
		if(tokens[1]){value = tokens[1];}
		return {
			type: type,
			value: value
		};
	}


	return {
		create: create,
		relate: relate,
		createrelate: createrelate,

		select: select,
		find: find,

		createorfind: createorfind,

		onPull: onPull,
		write: write,
		log: log,

		query: query,
	};
})();

//ptrn.onPull(function(type, value){
//	model.get(type, {}, function(data){
//		data.map(function(domain){
//			ptrn.write(domain.id, "domain", domain.name);
//		});
//	});
//});


model.get("overview", {}, function(data){
	data.map(function(domain){
		var d = ptrn.create("domain", domain.name);
		domain.Programs.map(function(program){
			var p = ptrn.create("program", program.name);
			ptrn.createrelate("mission", program.mission, p);

			ptrn.relate(d,p);
			program.Tasks.map(function(task){
				var t = ptrn.create("task", task.name);
				ptrn.createrelate("means", task.means, t);
				ptrn.createrelate("kpi", task.kpi, t);

				ptrn.relate(p,t);
				task.Efforts.map(function(effort){
					var e = ptrn.create("effort", effort.name);
					ptrn.createrelate("description", effort.description, e);
					ptrn.createrelate("endproduct", effort.endproduct, e);
					ptrn.createrelate("type", effort.type, e);
					ptrn.relate(t,e);

					effort.People.map(function(person){
						var p = ptrn.createorfind("person", person.name);
						ptrn.relate(p,e);
					});
				});
			});
		});
	});
});
