var Effort = function(){
	var openEditor;

	function getType(n){

		var types = [
			"Project",
			"Programma",
			"Routine",
			"Proces",
			"Improvisatie",
			"Klusje"
		];

		var type = "geen";
		if(n>-1){
			type = types[n];
		}
		return type;
	}

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
						content: Models.Effort.getContent().map(function(effort, count){
							return m(ListItem, {
								content: m(".effort",[
									m(".name", effort.name),
									m(".info",[
										m(".label", "type"),
										m("", getType(effort.type)),
										m(".label", "mensen"),
										effort.People.map(function(p){
											return m("", p.name);
										})
									])
								]),
								number: count+1,
								onclick: function(){
									viewModels.Hierarchy.updateEffort(effort.id);
								},
								onedit: function(){
									openEditor(effort);
								},
								selected: function(){
									return (viewModels.Hierarchy.getEffort() === effort.id);
								}
							});
						}),
						onadd: function() {
							openEditor();
						},
					})
				]);
			}
		}
	};
};
