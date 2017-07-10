var TaskSelector = function(){

	function selected(id){
		return (viewModels.Hierarchy.getTask() === id);
	}

	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".selector",[
					m(".selector-header", [
						"Opgaven"
					]),
					m(".selectorlist", m(".selectorlist-back", Models.Task.getContent().map(function(task, count){
						return m(".state-selectable.selectorlist-item", {
							class: (selected(task.id))?"state-selected":"",
							onclick: function(){
								viewModels.Hierarchy.updateTask(task.id);
							}
						},[
							m(".selectorlist-item-number", [
								m(".button-number", count+1),
								m(".selectorlist-item-edit.button-edit-small", m("i.material-icons","create"))
							]),
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
					}))),
				]);
			} else {
				return [];
			}
		}
	};
};
