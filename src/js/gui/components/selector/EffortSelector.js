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
									m(".effortselector-title", effort.value()),

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
										m(".effortselector-type", emptyState(viewModels.typeNames[effort("type").value()], m(".effortselector-type-state.state-empty", "Nog geen type"))),
										m(".effortselector-subheader", "Beoogd Effect"),
										m(".effortselector-description", effort("description").value().emptyState(m(".effortselector-description-state.state-empty", "Nog geen beoogd effect"))),
										m(".effortselector-subheader", "Eindproduct"),
										m(".effortselector-description", effort("endproduct").value().emptyState(m(".effortselector-description-state.state-empty", "Nog geen eindproduct"))),
										m(".effortselector-subheader", "Mensen"),
										m(".effortselector-peoplelist", effort("person", function(person){
											return m(".effortselector-peoplelist", person.value());
										}).emptyState(m(".effortselector-peoplelist-state.state-empty", "Nog geen mensen"))),
										m(".effortselector-subheader", "Periode"),
										m(".effortselector-period", [
											m("span.effortselector-period-label", "van"),
											m(DateDisplay, {date: effort("startdate").value()}),
											m("span.effortselector-period-label", "t/m"),
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
