var TaskSelector = function(){
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".taskselector",[
					m(".program-title", [
						viewModels.Hierarchy.getProgramName()
					]),
					m(".tasklist", Models.Task.getContent().map(function(task, count){
						return m(".tasklist-task", {
							onclick: function(){
								viewModels.Hierarchy.updateTask(task.id);
							}
						},[
							m(".tasklist-task-number.button-number", count+1),
							m(".tasklist-task-title", [
								m("span.tasklist-task-title-name", task.name),
								(task.means)?[
									m("span.tasklist-task-title-means-label", " door "),
									m("span.tasklist-task-title-means", task.means)
								]:[]

							]),

						]);
					})),
				]);
			} else {
				return m(".message", "no content");
			}
		}
	};
};
