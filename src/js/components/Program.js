var Program = function(){

	Models.Program.loadContent();

	return {
		view: function(vnode){
			return m(List, {
				title:"Programma's",
				selected: viewModels.Hierarchy.getProgram(),
				content: Models.Program.getContent().map(function(c){
					c.subcontent = [
						m(".mission", c.mission),
					];
					return c;
				}),
				onclick: function(id){
					viewModels.Hierarchy.updateProgram(id);
					shiftViewer(0);
				},
				onadd: function(name){
					Models.Program.newItem(name, function(id){
						viewModels.Hierarchy.updateProgram(id);
						shiftViewer(0);
					});
				}
			});
		}
	};
};
