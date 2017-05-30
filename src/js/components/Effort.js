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
						onsave: function(id, name, type, people){
							if(id===-1){
								Models.Effort.newItem(name, type, people, function(id){
									viewModels.Hierarchy.updateEffort(id);
									shiftViewer(2);
								});
							} else {
								Models.Effort.updateItem(id, name, type, people, function(id){
									viewModels.Hierarchy.updateEffort(id);
									shiftViewer(2);
								});
							}
						}
					}),
					m(List, {
						title:"Inspanningen",
						addbutton: true,
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
