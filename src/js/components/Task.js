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
						content: Models.Task.getContent().map(function(task, count){
							return m(ListItem, {
								content: m(".task",[
									m(".name", task.name)
								]),
								number: count+1,
								onclick: function(){
									viewModels.Hierarchy.updateTask(task.id);
								},
								onedit: function(){
									openEditor(task);
								},
								selected: function(){
									return (viewModels.Hierarchy.getTask() === task.id);
								}
							});
						}),
						onadd: function(){
							openEditor();
						}
					})
				]);
			}
		}
	};
};
