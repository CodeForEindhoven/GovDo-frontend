var TaskSelector = function(){

	function selected(id){
		return (viewModels.Hierarchy.getTask() === id);
	}

	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".selector",[
					m(".selector-header", [
						viewModels.Hierarchy.getProgramName()
					]),
					m(".selectorlist", Models.Task.getContent().map(function(task, count){
						return m(".selectorlist-item", {
							class: (selected(task.id))?"state-selected":"",
							onclick: function(){
								viewModels.Hierarchy.updateTask(task.id);
							}
						},[
							m(".selectorlist-item-number.button-number", count+1),
							m(".selectorlist-item-content", [
								m(".taskselector-title", [
									m("span.taskselector-title-name", task.name),
									(task.means)?[
										m("span.taskselector-title-means-label", " door "),
										m("span.taskselector-title-means", task.means)
									]:[]

								]),
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
