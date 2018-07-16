var TaskSelector = function(){

	return {
		view: function(vnode){
			if(vm.focus()){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Opgaven"),

						(vm.focus().type()==="program") ? m(".icons-header", [
							m("span.selector-tooltip", "Nieuwe Opgave"),
							m("i.material-icons", {
								onclick: function(){
									createnew.task();
								}
							}, "add"),
						]) : [],
					]),
					m(".selectorlist", m(".selectorlist-back", [
						(vm.focus().type()==="program") ? vm.program()("task", function(task){return task;})
						.sort(function(a,b){
							return parseInt(a("order").value()) - parseInt(b("order").value());
						}).map(function(task){
							if(ptrn.compare(vm.create(), task)) {
								return m(CreateTaskSelectorItem,{task: task});
							} else {
								return m(TaskSelectorItem,{task: task});
							}

						}).emptyState(m(TaskSelectorEmptyState))
						: [],

						(vm.focus().type()==="task") ? m(TaskSelectorItem,{task: vm.focus()}) : [],

						(vm.focus().type()==="effort") ? vm.focus()("task program", function(program){
							return m(".selector-devider",[
								m(".selector-subtitle",program.value()),
								program("task", function(t){return t;})
									.filter(function(t){
										return (t("#"+vm.focus().id()).id()>-1);
									})
									.map(function(task){
										return m(TaskSelectorItem,{task: task});
									})
							]);
						}).emptyState(m(".selectorlist-state.state-empty", "Nog geen opgaven")) : [],

						(vm.focus().type()==="person") ? vm.person()("effort task program", function(program){
							return m(".selector-devider",[
								m(".selector-subtitle",program.value()),
								program("task", function(t){return t;})
									.filter(function(t){
										return (t("effort #"+vm.person().id()).id()>-1);
									})
									.map(function(task){
										return m(TaskSelectorItem,{task: task});
									})
							]);
						}).emptyState(m(".selectorlist-state.state-empty", "Nog geen opgaven")) : []
					])),
				]);
			} else {
				return [];
			}
		}
	};
};

var TaskSelectorEmptyState = function(){
	return {
		view: function(vnode){
			return [
				ArrayFromRange(0,3).map(function(i){
					return m(".selectorlist-item-grey",[
						m(".selectorlist-item-number-grey", ""),
						m(".selectorlist-item-content", [
							m(".selectorlist-item-line-grey", ""),
							m(".selectorlist-item-line-short-grey", ""),
							m(".selectorlist-item-line-grey", ""),
							m(".selectorlist-item-line-short-grey", ""),
						]),

					]);
				}),
				m(".selectorlist-emptystate",[
					m(".selectorlist-emptystate-message-header", "Oh, hallo daar! 👋"),
					m(".selectorlist-emptystate-message", [m("em",vm.program().value())," heeft nog geen opgaven."]),
					m(".selectorlist-emptystate-button.button",{
						onclick: function(){
							createnew.task();
						}
					},"Nieuwe opgave"),
					m(".selectorlist-emptystate-message", "Klik op de + in de rechterbovenhoek om een nieuwe opgave toe te voegen"),
					//m("img", {src: "images/arrow-ins_preview.png"})
				]),
			];
		}
	};
};

var TaskSelectorItem = function(){
	function shiftItem(item, dir){
		var taskcount = vm.program()("task", function(a){return a;}).length;
		var currentorder = item("order");
		var other = vm.program()("task", function(task){
			return task;
		}).filter(function(task){
			return (task("order").value() === (parseInt(currentorder.value())+dir));
		})[0];
		if(other){
			ptrn.unrelate(item, currentorder);
			ptrn.relate(item, other("order"));
			ptrn.unrelate(other, other("order"));
			ptrn.relate(other, currentorder);
			ptrn.transact();
			//vm.task(item);
		}
	}

	function selectItem(task){
		console.log("select");
		if(vm.edit() && vm.edit().type()==="effort"){
			vm.editClose();
			if(!ptrn.compare(vm.task(), task)){
				vm.task(task);
			}
		} else {
			vm.task(task);
		}
	}

	return {
		view: function(vnode){
			var task = vnode.attrs.task;
			return m(".state-selectable.selectorlist-item", {
				class: (ptrn.compare(vm.task(),task)?"state-selected":"") +" "+ (task("mode").value()=="-1"?"mode-sketch":""),
			},[
				m(".selectorlist-item-number",  {
					onclick: function(){selectItem(task);},
				}, [
					m(Numbering, {node: task}),
				]),
				m(".selectorlist-item-content", {
					onclick: function(){selectItem(task);},
				}, [
					m(".selector-selected-title", task.value().emptyState(m(".selectorlist-state.state-empty", "Opgave zonder titel"))),
					m(".selectorlist-item-options",[
						(vm.focus().type()==="program") ? m(".selectorlist-item-options-position", [
							m(".selectorlist-item-option.icon-button-grey",{
								onclick: function(e){
									e.stopPropagation();
									window.event.cancelBubble = true;
									shiftItem(task, 1);
									return false;
								}
							},[
								m("i.material-icons","keyboard_arrow_down"),
								m("span.selector-tooltip-bottom", "Volgorde veranderen"),
							]),
							m(".selectorlist-item-option.icon-button-grey",{
								onclick: function(e){
									e.stopPropagation();
									window.event.cancelBubble = true;
									shiftItem(task, -1);
									return false;
								}
							},[
								m("i.material-icons","keyboard_arrow_up"),
								m("span.selector-tooltip-bottom", "Volgorde veranderen"),
							]),
						]) : [],
						m(".selectorlist-item-option.icon-button-grey.selectorlist-item-option-edit",{
							onclick: function(){
								vm.edit(task);
							}
						}, [
							m(Icon, {name: "edit"}),
							m("span.selector-tooltip-bottom", "Opgave bewerken"),
						]),
					]),
					(task("means").value() !== "")?[
						m("span.selector-selected-title-means-label", m("i.material-icons .selector-selected-arrow", "arrow_forward")),
						m("span.selector-selected-title-means", task("means").value()),
					]:[],
				]),
				m(".selector-hidden",[
					m(".selector-selected-subheader.subtitle", "Indicator"),
					task("kpi", function(kpi){
						return m(".selector-selected-description.kpi", "- "+kpi.value());
					}).emptyState(m(".selector-selected-description.state-empty", "Nog geen indicator"))
					//m(".selector-selected-description.kpi", task("kpi").value().emptyState(m(".selector-selected-description.state-empty", "Nog geen indicator")))
				])
			]);
		}
	};
};

var CreateTaskSelectorItem = function(){
	function close(task){
		var close = true;
		if(task.value().length > 0){
			if (confirm("Wijzigingen niet opslaan?") === true) {
				ptrn.unSpeculate();
			} else {
				close = false;
			}
		}

		if(close){
			ptrn.unSpeculate();
			vm.createClose();
		}
	}

	function save(task){
		vm.createClose();
		ptrn.transact();
		vm.task(task);
	}

	function more(task){
		vm.createClose();
		vm.edit(task);
	}

	return {
		view: function(vnode){
			return m(InplaceEditor,{
				placeholder: "Opgave titel invoeren",
				element: vnode.attrs.task,
				onclose: close,
				onsave: save,
				onmore: more
			});
		}
	};
};
