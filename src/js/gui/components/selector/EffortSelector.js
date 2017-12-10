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
			if(vm.task()){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Inspanningen"),
							m(".icons-header", [
								m("span.selector-tooltip", "Nieuwe Inspanning"),
								m("i.material-icons", {
									onclick: function(){
										createnew.effort();
									}
								}, "add")
							]),
					]),
					m(".selectorlist", {
						onbeforeupdate: function(vnode, old){
							scrollstore = old.dom.scrollTop;
						},
						onupdate: function(vnode){
							vnode.dom.scrollTop = scrollstore;
						}
					},m(".selectorlist-back", [
						selection(function(effort){
							return m(".state-selectable.selectorlist-item", {
								class: (ptrn.compare(vm.effort(),effort)?"state-selected":"") + " " +(effort('mode').value()==="0"?"":"mode-sketch"),
							},[
								m(".selectorlist-item-number", {
									onclick: function(){
										vm.effort(effort);
									},
								}, [
									m(Numbering, {node: effort}),
								]),
								m(".selectorlist-item-content", {
									onclick: function(){
										vm.effort(effort);
									},
								}, [
									m(".selector-selected-title", effort.value().emptyState(m(".selectorlist-state.state-empty", "Inspanning zonder titel"))),

									m(".selectorlist-item-labels",[
										(effort('mode').value()==-1) ? m(".selectorlist-item-label-position", "Concept") : [],
										(effort('mode').value()==-2) ? m(".selectorlist-item-label-position", "Voorgelegd") : [],
									]),

									m(".selectorlist-item-options",[
										m(".selectorlist-item-options-position", [
											m("i.material-icons.selectorlist-item-option",{
												onclick: function(e){
													shiftItem(effort, 1);
												}
											},"keyboard_arrow_down"),
											m("i.material-icons.selectorlist-item-option",{
												onclick: function(e){
													shiftItem(effort, -1);
												}
											},"keyboard_arrow_up"),
										]),
										m(".selectorlist-item-option.button-edit-small",{
											onclick: function(){
												vm.edit(effort);
											}
										}, m(Icon, {name: "edit"})),
									]),

								]),
								m(".selector-hidden",[
									m(".selector-selected-type", emptyState(viewModels.typeNames[effort("type").value()], m(".state-empty", "Nog geen type"))),
									m(".selector-selected-subheader.subtitle", "Beoogd Effect"),
									m(".selector-selected-description.body-text", effort("description").value().emptyState(m(".effortselector-description-state.state-empty", "Nog geen beoogd effect"))),
									m(".selector-selected-subheader.subtitle", "Eindproduct"),
									m(".selector-selected-description.body-text", effort("endproduct").value().emptyState(m(".selector-selected-description.state-empty", "Nog geen eindproduct"))),
									m(".selector-selected-subheader.subtitle", "Mensen"),
									m(".selector-selected-description.body-text", effort("person", function(person){
										return m(".selector-selected-peoplelist.body-text", [
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
						}).emptyState(m(".selectorlist-state.state-empty", "Nog geen inspanningen"))
					])),
				]);
			} else {
				return [];
			}
		}
	};
};
