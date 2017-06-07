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
						onsave: function(id, name, means){
							if(id===-1){
								Models.Task.newItem(name, means, function(id){
									viewModels.Hierarchy.updateTask(id);
								});
							} else {
								Models.Task.updateItem(id, name, means, function(id){
									viewModels.Hierarchy.updateTask(id);
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
									m("span.name", task.name),
									(task.means? m("span.means",[
										m("span.door", " door "),
										m("span", task.means)
									]):[])
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
