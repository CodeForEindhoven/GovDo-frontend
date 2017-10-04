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
										createnew.task();
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
									if(vm.edit() && vm.edit().type()==="effort"){
										vm.editClose();
										if(!ptrn.compare(vm.task(), task)){
											vm.task(task);
										}
									} else {
										vm.task(task);
									}
								}
							},[
								m(".selectorlist-item-number", [
									m(".button-number", task("order").value()),
									m(".selectorlist-item-edit.button-edit-small",{
										onclick: function(){
											vm.edit(task);
										}
									},

									m(".selectorlist-item-position", [
									m("i.material-icons","keyboard_arrow_down"),
									m("i.material-icons","keyboard_arrow_up"),
									]),

									m("i.material-icons","build")),
								]),

								m(".selectorlist-item-content", [
									m(".selector-selected", [
										m(".selector-selected-title", task.value()),
										(task("means").value() !== "")?[
											m("span.selector-selected-title-means-label", m("i.material-icons .selector-selected-arrow", "arrow_forward")),
											m("span.selector-selected-title-means", task("means").value()),
										]:[],
										m(".selector-hidden",[
											m(".selector-selected-subheader", "Indicator"),
											m(".selector-selected-description.kpi", task("kpi").value().emptyState(m(".selector-selected-description.state-empty", "Nog geen indicator")))
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
