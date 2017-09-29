var TaskSelector = function(){
	return {
		view: function(vnode){
			if(vm.program()){
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
						vm.program()("task", function(task){
							return m(".state-selectable.selectorlist-item", {
								class: (ptrn.compare(vm.task(),task)?"state-selected":"") +" "+ (task("mode").value()==-1?"mode-sketch":""),
								onclick: function(){
									vm.task(task);
								}
							},[
								m(".selectorlist-item-number", [
									m(".button-number", task("order").value()),
									m(".selectorlist-item-edit.button-edit-small",{
										onclick: function(){
											viewModels.editMode.set("task", task);
										}
									}, 
									
									m(".position", [
									m("i.material-icons","keyboard_arrow_down"), 
									m("i.material-icons","keyboard_arrow_up"), 
									]),
									
									m("i.material-icons","build")),
								]),
								
								m(".selectorlist-item-content", [
									m(".taskselector-title", [
										m("span.taskselector-title-name", task.value()),
										(task("means").value() !== "")?[
											m("span.taskselector-title-means-label", m("i.material-icons .taskselector-arrow", "arrow_forward")),
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
