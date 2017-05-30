var Task = function(){
	var openEditor;

	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".half", [
					m(EditorTask,{
						title: "Opgave",
						open: function(openfunction){
							openEditor = openfunction;
						},
						onsave: function(id, name, mission){
							if(id===-1){
								Models.Task.newItem(name, function(id){
									viewModels.Hierarchy.updateTask(id);
									shiftViewer(1);
								});
							} else {
								Models.Task.updateItem(id, name, function(id){
									viewModels.Hierarchy.updateTask(id);
									shiftViewer(1);
								});
							}
						}
					}),
					m(List, {
						title:"Opgaven ",
						addbutton: true,
						selected: viewModels.Hierarchy.getTask(),
						content: Models.Task.getContent(),
						onclick: function(id){
							viewModels.Hierarchy.updateTask(id);
							shiftViewer(1);
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
