var Program = function(){

	Models.Program.loadContent();
	var openEditor;

	return {
		view: function(vnode){
			return m(".half",[
				m(EditorProgram, {
					title: "Programma",
					open: function(openfunction){
						openEditor = openfunction;
					},
					onsave: function(id, name, mission){
						if(id===-1){
							Models.Program.newItem(name, mission, function(id){
								viewModels.Hierarchy.updateProgram(id);
								shiftViewer(0);
							});
						} else {
							Models.Program.updateItem(id, name, mission, function(id){
								viewModels.Hierarchy.updateProgram(id);
								shiftViewer(0);
							});
						}
					}
				}),
				m(List, {
					title:"Programma's",
					selected: viewModels.Hierarchy.getProgram(),
					content: Models.Program.getContent().map(function(c){
						if(c.mission){
							c.subcontent = [
								m(".mission", c.mission),
							];
						}
						return c;
					}),
					onclick: function(id){
						viewModels.Hierarchy.updateProgram(id);
						shiftViewer(0);
					},
					onedit: function(properties){
						openEditor(properties);
					},
					onadd: function(){
						openEditor();
					}
				})
			]);
		}
	};
};
