var EffortSelector = function(){
	var scrollstore = 0;
	//var dragover;

	function selection(callback){
		if(vm.focus().type()==="program"){
			return vm.task()("effort", function(effort){return effort;})
			.sort(function(a,b){
				return parseInt(a("order").value()) - parseInt(b("order").value());
			}).map(callback);
		} else if(vm.focus().type()==="task"){
			return vm.task()("effort", callback);
		} else if(vm.focus().type()==="effort"){
			return [callback(vm.focus())];
		} else if(vm.focus().type()==="person"){
			//return vm.person()("effort #"+vm.task().id()+" effort", callback);
			return vm.task()("effort", function(e){return e;})
			.filter(function(e){
				return (e("#"+vm.person().id()).id()>-1);
			})
			.map(callback);
		}
	}

	function hasrelated(){
		return (vm.focus().type()==="program" && vm.task()("related", function(e){return e;}).length > 0);
	}

	return {
		view: function(vnode){
			if(vm.task()){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Inspanningen"),
						(vm.focus().type()==="program") ? m(".icons-header", [
							m("span.selector-tooltip", "Nieuwe Inspanning"),
							m("i.material-icons", {
								onclick: function(){
									createnew.effort();
								}
							}, "add")
						]) : [],
					]),
					m(".selectorlist", {
						onbeforeupdate: function(vnode, old){
							scrollstore = old.dom.scrollTop;
						},
						onupdate: function(vnode){
							vnode.dom.scrollTop = scrollstore;
						}
					}, [
						m(".selectorlist-back", {
							class: hasrelated() ? "selectorlist-back-nostretch" : "",
						},[
							selection(function(effort){
								if(ptrn.compare(vm.create(), effort)) {
									return m(CreateEffortSelectorItem,{effort: effort});
								} else {
									return m(EffortSelectorItem,{effort: effort});
								}
							}).emptyState(m(EffortSelectorEmptyState)),
						]),
						hasrelated() ? m(".selectorlist-related", [
							m(".selector-subtitle", "Gerelateerde Inspanningen"),
							vm.task()("related effort", function(effort){
								return m(EffortSelectorItem, {effort: effort, related: true});
							})
						]) : []
					]),
				]);
			} else {
				return [];
			}
		}
	};
};

var EffortSelectorEmptyState = function(){
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
					m(".selectorlist-emptystate-message-header", "Top! 👍"),
					m(".selectorlist-emptystate-message", "Deze opgave heeft geen inspanningen. Is er dan écht niets te doen?"),
					m(".selectorlist-emptystate-button.button",{
						onclick: function(){
							createnew.effort();
						}
					},"Nieuwe inspanning"),
					m(".selectorlist-emptystate-message", "Klik op de + in de rechterbovenhoek om een nieuwe inspanning toe te voegen"),
				])
			];
		}
	};
};

var EffortSelectorItem = function(){
	function shiftItem(item, dir){
		var taskcount = vm.task()("effort", function(a){return a;}).length;
		var currentorder = item("order");
		var other = vm.task()("effort", function(task){
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
		}
	}

	return {
		view: function(vnode){
			var effort = vnode.attrs.effort;
			return m(".state-selectable.selectorlist-item", {
				class: (ptrn.compare(vm.effort(),effort)?"state-selected":"") + " " +(effort('mode').value()==="0"?"":"mode-sketch"),
			},[
				m(".selectorlist-item-number", {
					onclick: function(){
						vm.effort(effort);
					},
				}, [
					m(Numbering, {node: effort, whole: vnode.attrs.related}),
				]),
				m(".selectorlist-item-content", {
					onclick: function(){
						vm.effort(effort);
					},
				}, [
					//title
					m(".selector-selected-title", effort.value().emptyState(m(".selectorlist-state.state-empty", "Inspanning zonder titel"))),
					m(".selectorlist-item-labels",[
						(effort('mode').value()==-1) ? m(".selectorlist-item-label-position", "Concept") : [],
						(effort('mode').value()==-2) ? m(".selectorlist-item-label-position", "Voorgelegd") : [],
					]),

					//Options
					m(".selectorlist-item-options",[
						(vm.focus().type()==="program" && vnode.attrs.related !== true) ? m(".selectorlist-item-options-position", [
							m(".selectorlist-item-option.icon-button-grey",{
								onclick: function(e){
									e.stopPropagation();
									window.event.cancelBubble = true;
									shiftItem(effort, 1);
								}
							},[
								m("i.material-icons","keyboard_arrow_down"),
								m("span.selector-tooltip-bottom", "Volgorde veranderen"),
							]),
							m(".selectorlist-item-option.icon-button-grey",{
								onclick: function(e){
									e.stopPropagation();
									window.event.cancelBubble = true;
									shiftItem(effort, -1);
								}
							},[
								m("i.material-icons","keyboard_arrow_up"),
								m("span.selector-tooltip-bottom", "Volgorde veranderen"),
							]),
						]) : [],
						m(".selectorlist-item-option.icon-button-grey.selectorlist-item-option-edit",{
							onclick: function(){
								vm.edit(effort);
							}
						}, [
							m(Icon, {name: "edit"}),
							m("span.selector-tooltip-bottom", "Inspanning bewerken"),
						]),
					]),
				]),

				//hidden information
				m(".selector-hidden",[
					m(".selector-selected-type", emptyState(viewModels.typeNames[effort("type").value()], m(".state-empty", "Nog geen type"))),
					m(".selector-selected-subheader.subtitle", "Beoogd Effect"),
					m(".selector-selected-description.body-text", effort("description").value().emptyState(m(".effortselector-description-state.state-empty", "Nog geen beoogd effect"))),
					m(".selector-selected-subheader.subtitle", "Eindproduct"),
					m(".selector-selected-description.body-text", effort("endproduct").value().emptyState(m(".selector-selected-description.state-empty", "Nog geen eindproduct"))),

					m(".selector-selected-subheader.subtitle", "Indicator"),
					m(".selector-selected-description.body-text", effort("kpi", function(kpi){
						return m(".selector-selected-description.kpi", "- "+kpi.value());
					}).emptyState(m(".selector-selected-description.state-empty", "Nog geen indicator"))),

					m(".selector-selected-subheader.subtitle", "Mensen"),
					m(".selector-selected-description.body-text", effort("person", function(person){
						return m(".selector-selected-peoplelist.body-text",{
							class: ptrn.compare(effort("role:leader person"), person) ? "selector-selected-peoplelist-person-leader" : ""
						},[
							m("span.selector-selected-peoplelist-person", person.value()),
							m("span.selector-selected-peoplelist-icons", [m(NavWidget, {node: person})])
						]);
					}).emptyState(m(".selector-selected-description.state-empty", "Nog geen mensen"))),
					m(".selector-selected-subheader.subtitle", "Periode"),
					m(".selector-selected-description.body-text", [
						m("span.selector-selected-period-label.body-text", "van"),
						m(DateDisplay, {date: effort("startdate").value()}),
						m("span.selector-selected-period-label.body-text", "t/m"),
						m(DateDisplay, {date: effort("enddate").value()}),
					])
				])
			]);
		}
	};
};

var CreateEffortSelectorItem = function(){

	function close(effort){
		var close = true;
		if(effort.value().length > 0){
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

	function save(effort){
		vm.createClose();
		ptrn.transact();
		vm.effort(effort);
	}

	function more(effort){
		vm.createClose();
		vm.edit(effort);
	}

	return {
		view: function(vnode){
			return m(InplaceEditor,{
				placeholder: "Inspanning titel invoeren",
				element: vnode.attrs.effort,
				onclose: close,
				onsave: save,
				onmore: more
			});
		}
	};
};
