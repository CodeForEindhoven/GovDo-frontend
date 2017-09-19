var TaskSelector = function(){

	function selected(id){
		return (viewModel.currentTask && (viewModel.currentTask.id() === id));
	}

	//function editable(id){
	//	return (!viewModels.editMode.state() && selected(id));
	//}

	function editing(id){
		if(viewModels.editMode.state() && viewModels.editMode.isType("task")){
			return (viewModels.editMode.content().id === id);
		}
		return false;
	}

	return {
		view: function(vnode){
			if(viewModel.currentProgram){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Opgaven"),
							m(".icons-header", [
								m("i.material-icons", {
									onclick: function(){
										viewModels.editMode.new("task");
									}
								}, "add"),
								//m("i.material-icons", {}, "import_export"),
								m("i.material-icons", {}, "info_outline")
							]),
					]),
					m(".selectorlist", m(".selectorlist-back", [
						viewModel.currentProgram("task", function(task){
							return m(".state-selectable.selectorlist-item", {
								class: ((selected(task.id()))?"state-selected":"") +" "+((editing(task.id))?"state-editing":"")+" "+(task.mode?"mode-sketch":""),
								onclick: function(){
									viewModel.currentTask = task;
								}
							},[
								m(".selectorlist-item-number", [
									m(".button-number", task("order").value()),
									m(".selectorlist-item-edit.button-edit-small",{
										onclick: function(){
											viewModels.editMode.set("task", task);
										}
									}, m("i.material-icons","build"))
								]),
								m(".selectorlist-item-content", [
									m(".taskselector-title", [
										m("span.taskselector-title-name", task.value()),
										(task("means"))?[
											m("span.taskselector-title-means-label", " door "),
											m("span.taskselector-title-means", task("means").value()),
										]:[],
										m(".selector-hidden",[
											m(".taskselector-subheader", "Indicator"),
											m("span.taskselector-kpi", task("kpi").value().emptyState(m(".effortselector-description-state.state-empty", "Nog geen indicator")))
										])
									]),
								]),
							]);
						}).emptyState(m(".selectorlist-state.state-empty", "Nog geen opgaven"))
					])),
				]);
			} else {
				return [];
			}
		}
	};
};
