var Program = function(){

	Models.Program.loadContent();
	var openEditor;

	return {
		view: function(vnode){
			var count = 1;
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
					content: Models.Program.getContent().map(function(domain){
						return m(".domain",[
							m(".title", domain.name),
							domain.Programs.map(function(program){
								return m(ListItem, {
									content: m(".program",[
										m(".name", program.name),
										m(".mission", program.mission),
									]),
									number: count++,
									onclick: function(){
										console.log(program.id);
										viewModels.Hierarchy.updateProgram(program.id);
									},
									onedit: function(){
										openEditor(program);
									},
									selected: function(){
										return (viewModels.Hierarchy.getProgram() === program.id);
									}
								});
							})
						]);
					}),
					onadd: function(){
						openEditor();
					}
				})
			]);
		}
	};
};
