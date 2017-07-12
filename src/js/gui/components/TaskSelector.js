var TaskSelector = function(){

	function selected(id){
		return (viewModels.Hierarchy.getTask() === id);
	}

	function editable(id){
		return (!viewModels.editMode.state() && selected(id));
	}

	function editing(id){
		if(viewModels.editMode.state() && viewModels.editMode.isType("task")){
			return (viewModels.editMode.content().id === id);
		}
		return false;
	}

	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Opgaven"),
							m(".icons-header", [					
								m("i.material-icons", {
									class: !viewModels.editMode.state()?"":"state-hidden",
									onclick: function(){
										viewModels.editMode.new("effort");
									}
								}, "add"),
								m("i.material-icons", {}, "import_export"),
								m("i.material-icons", {}, "info_outline")
							]),
					]),
					m(".selectorlist", m(".selectorlist-back", Models.Task.getContent().map(function(task, count){
						return m(".state-selectable.selectorlist-item", {
							class: ((selected(task.id))?"state-selected":"") +" "+((editing(task.id))?"state-editing":""),
							onclick: function(){
								viewModels.Hierarchy.updateTask(task.id);
							}
						},[
							m(".selectorlist-item-number", [
								m(".button-number", count+1),
								m(".selectorlist-item-edit.button-edit-small",{
									class: (editable(task.id))?"":"state-hidden",
									onclick: function(){
										viewModels.editMode.set("task", task);
									}
								}, m("i.material-icons","build"))
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
