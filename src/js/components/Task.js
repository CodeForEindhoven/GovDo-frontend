var Task = function(){
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(List, {
					title:"Opgaven ",
					selected: viewModels.Hierarchy.getTask(),
					content: Models.Task.getContent(),
					onclick: function(id){
						viewModels.Hierarchy.updateTask(id);
						shiftViewer(1);
					},
					onadd: function(name){
						Models.Task.newItem(name, function(id){
							viewModels.Hierarchy.updateTask(id);
							shiftViewer(1);
						});
					}
				});
			}
		}
	};
};
