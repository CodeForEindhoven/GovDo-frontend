var EffortSelector = function(){
	var scrollstore = 0;

	function selected(id){
		return (viewModel.currentEffort && (viewModel.currentEffort.id() === id));
	}

	function editable(id){
		return (!viewModels.editMode.state() && selected(id));
	}

	function editing(id){
		if(viewModels.editMode.state() && viewModels.editMode.isType("effort")){
			return (viewModels.editMode.content().id === id);
		}
		return false;
	}

	return {
		view: function(vnode){
			if(viewModel.currentTask){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Inspanningen"),
							m(".icons-header", [
								m("i.material-icons", {
									onclick: function(){
										viewModels.editMode.new("effort");
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
						viewModel.currentTask("effort", function(effort, count){
							return m(".state-selectable.selectorlist-item", {
								class: ((selected(effort.id()))?"state-selected":"") +" "+((editing(effort.id))?"state-editing":"")+" "+(effort.mode?"mode-sketch":""),
								onclick: function(){
									viewModel.currentEffort = effort;
								}
							},[
								m(".selectorlist-item-number", [
									m(".button-number", effort("order").value()),
									m(".selectorlist-item-edit.button-edit-small",{
										onclick: function(){
											//viewModel.currentEffort = effort;
										}
									}, m("i.material-icons","build"))
								]),
								m(".selectorlist-item-content", [
									m(".effortselector-title", effort.value()),
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
