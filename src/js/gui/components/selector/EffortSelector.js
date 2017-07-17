var EffortSelector = function(){
	var scrollstore = 0;

	function selected(id){
		return (viewModels.Hierarchy.getEffort() === id);
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
			if(viewModels.Hierarchy.getTask()>0){
				return m(".selector",[
					m(".selector-header", [
						m("span", "Inspanningen"),
							m(".icons-header", [
								m("i.material-icons", {
									onclick: function(){
										viewModels.editMode.new("effort");
									}
								}, "add"),
								m("i.material-icons", {}, "import_export"),
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
					},m(".selectorlist-back", Models.Effort.getContent().map(function(effort, count){
						return m(".state-selectable.selectorlist-item", {
							class: ((selected(effort.id))?"state-selected":"") +" "+((editing(effort.id))?"state-editing":"")+" "+(effort.mode?"mode-sketch":""),
							onclick: function(){
								viewModels.Hierarchy.updateEffort(effort.id);
							}
						},[
							m(".selectorlist-item-number", [
								m(".button-number", count+1),
								m(".selectorlist-item-edit.button-edit-small",{
									onclick: function(){
										viewModels.editMode.set("effort", effort);
									}
								}, m("i.material-icons","build"))
							]),
							m(".selectorlist-item-content", [
								m(".effortselector-title", effort.name),
								m(".selector-hidden",[
									m(".effortselector-type", emptyState(viewModels.typeNames[effort.type], m(".effortselector-type-state.state-empty", "Nog geen type"))),
									m(".effortselector-description", effort.description.emptyState(m(".effortselector-description-state.state-empty", "Nog geen beschrijving"))),
									m(".effortselector-subheader", "Mensen"),
									m(".effortselector-peoplelist", effort.People.map(function(person){
										return m(".effortselector-peoplelist", person.name);
									}).emptyState(m(".effortselector-peoplelist-state.state-empty", "Nog geen mensen"))),
								])
							]),
						]);
					}).emptyState(m(".selectorlist-state.state-empty", "Nog geen inspanningen")))),
				]);
			} else {
				return [];
			}
		}
	};
};
