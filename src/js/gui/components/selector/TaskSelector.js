var TaskSelector = function(){

	function selection(callback){
		if(vm.focus().type()==="program"){
			return vm.program()("task", callback);
		} else if(vm.focus().type()==="person"){
			return vm.person()("effort task", callback);
		}
	}

	return {
		view: function(vnode){
			if(vm.focus()){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Opgaven"),
							m(".icons-header", [
								m("i.material-icons", {
									onclick: function(){
										createnew.task();
									}
								}, "add"),
								m(Icon, {name: "info"}),
							]),
					]),
					m(".selectorlist", m(".selectorlist-back", [
						selection(function(task){
							return m(".state-selectable.selectorlist-item", {
								class: (ptrn.compare(vm.task(),task)?"state-selected":"") +" "+ (task("mode").value()==-1?"mode-sketch":""),

							},[
								m(".selectorlist-item-number", [
									m(Numbering, {node: task}),
								]),

								m(".selectorlist-item-content", {
									onclick: function(){
										if(vm.edit() && vm.edit().type()==="effort"){
											vm.editClose();
											if(!ptrn.compare(vm.task(), task)){
												vm.task(task);
											}
										} else {
											vm.task(task);
										}
									},
								}, [
									m(".selector-selected-title", task.value()),

									m(".selectorlist-item-options",[
										m(".selectorlist-item-options-position", [
											m("i.material-icons.selectorlist-item-option","keyboard_arrow_down"),
											m("i.material-icons.selectorlist-item-option","keyboard_arrow_up"),
										]),
										m(".selectorlist-item-option.button-edit-small",{
											onclick: function(){
												vm.edit(task);
											}
										}, m(Icon, {name: "edit"})),
									]),

									(task("means").value() !== "")?[
										m("span.selector-selected-title-means-label", m("i.material-icons .selector-selected-arrow", "arrow_forward")),
										m("span.selector-selected-title-means", task("means").value()),
									]:[],
								]),
								m(".selector-hidden",[
									m(".selector-selected-subheader", "Indicator"),
									m(".selector-selected-description.kpi", task("kpi").value().emptyState(m(".selector-selected-description.state-empty", "Nog geen indicator")))
								])
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
