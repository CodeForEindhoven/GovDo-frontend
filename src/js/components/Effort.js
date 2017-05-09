var Effort = function(){
	var openEditor;

	var types = [
		"Project",
		"Programma",
		"Routine",
		"Proces",
		"Improvisatie",
		"Klusje"
	];

	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getTask()>0){
				return m(".half",[
					m(EditorEffort,{
						title: "Inspanning",
						open: function(openfunction){
							openEditor = openfunction;
						},
						updateProperties: function(updatefunction){
							updateEditor = updatefunction;
						},
						onsetType: function(id, type){
							Models.Effort.setType(id, type);
						},
						onsave: function(id, name, type, peopleupdates){
							function updatePeople(ids){
								for(var i=0; i<peopleupdates.length; i++){
									var update = peopleupdates[i];
									if(update.addremove==="add"){
										console.log(i);
										console.log(update);
										Models.Effort.setPerson(ids, update.person);
									} else if(update.addremove==="remove"){
										console.log(i);
										console.log(update);
										Models.Effort.removePerson(ids, update.person);
									}
								}
							}

							if(id===-1){
								Models.Effort.newItem(name, type, function(id){
									viewModels.Hierarchy.updateEffort(id);
									updatePeople(id);
									shiftViewer(2);
								});
							} else {
								Models.Effort.updateItem(id, name, type, function(id){
									viewModels.Hierarchy.updateEffort(id);
									updatePeople(id);
									shiftViewer(2);
								});
							}
						}
					}),
					m(List, {
						title:"Inspanningen",
						selected: viewModels.Hierarchy.getEffort(),
						content: Models.Effort.getContent().map(function(e){
							var type = "geen";
							if(e.type>-1){
								type = types[e.type];
							}
							e.subcontent = [
								m(".header", "type"),
								m("", type),
								m(".header", "mensen"),
								e.People.map(function(p){
									return m("", p.name);
								})
							];
							return e;
						}),
						onclick: function(id){
							viewModels.Hierarchy.updateEffort(id);
							shiftViewer(2);
						},
						onadd: function(){
							openEditor();
						},
						onedit: function(properties){
							openEditor(properties);
						}
					})
				]);
			}
		}
	};
};
