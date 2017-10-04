var EffortSelector = function(){
	var scrollstore = 0;
	//var dragover;

	return {
		view: function(vnode){
			if(vm.task()){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Inspanningen"),
							m(".icons-header", [
								m("i.material-icons", {
									onclick: function(){
										createnew.effort();
									}
								}, "add"),
								//m("i.material-icons", {}, "import_export"),
								m("i.material-icons", {}, "info_outline")
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
						vm.task()("effort", function(effort){
							return m(".state-selectable.selectorlist-item", {
								//draggable: true,
								class: (ptrn.compare(vm.effort(),effort)?"state-selected":"") + " " +(effort('mode').value()==-1?"mode-sketch":""),
								onclick: function(){
									vm.effort(effort);
								},
								//ondragenter: function(e){
								//	this.classList.add('drag-over');
								//},
								//ondragover: function(e){
								//	e.preventDefault(); // Necessary. Allows us to drop.
								//	dragover = effort.id();
								//	e.dataTransfer.dropEffect = 'move';
								//}
							},[
								m(".selectorlist-item-number", [
									m(".button-number", effort("order").value()),

								]),
								m(".selectorlist-item-content", [
									m(".selector-selected-title", effort.value()),

									m(".selectorlist-item-edit.button-edit-small",{
										onclick: function(){
											vm.edit(effort);
										}
									},

									m(".selectorlist-item-position", [
									m("i.material-icons","keyboard_arrow_down"),
									m("i.material-icons","keyboard_arrow_up"),
									]),

									m("i.material-icons","build")),
									m(".selector-hidden",[
										m(".selector-selected-type", emptyState(viewModels.typeNames[effort("type").value()], m(".state-empty", "Nog geen type"))),
										m(".selector-selected-subheader", "Beoogd Effect"),
										m(".selector-selected-description", effort("description").value().emptyState(m(".effortselector-description-state.state-empty", "Nog geen beoogd effect"))),
										m(".selector-selected-subheader", "Eindproduct"),
										m(".selector-selected-description", effort("endproduct").value().emptyState(m(".selector-selected-description.state-empty", "Nog geen eindproduct"))),
										m(".selector-selected-subheader", "Mensen"),
										m(".selector-selected-description", effort("person", function(person){
											return m(".selector-selected-peoplelist", {
												onclick: function(){
													vm.person(person);
													vm.page(1);
												}
											}, person.value());
										}).emptyState(m(".selector-selected-description.state-empty", "Nog geen mensen"))),
										m(".selector-selected-subheader", "Periode"),
										m(".selector-selected-description", [
											m("span.selector-selected-period-label", "van"),
											m(DateDisplay, {date: effort("startdate").value()}),
											m("span.selector-selected-period-label", "t/m"),
											m(DateDisplay, {date: effort("enddate").value()}),
										])

									])
								]),
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
