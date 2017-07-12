var EffortSelector = function(){

	function selected(id){
		return (viewModels.Hierarchy.getEffort() === id);
	}

	function editable(id){
		return (!viewModels.editMode.state() && selected(id));
	}

	function editing(id){
		if(viewModels.editMode.state()){
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
						m("i", {class:"material-icons hide-icon"}, "info_outline"),
						m("i", {class:"material-icons"}, "import_export"),
						m("i", {class:"material-icons"}, "add")
					]),
					m(".selectorlist", m(".selectorlist-back", Models.Effort.getContent().map(function(effort, count){
						return m(".state-selectable.selectorlist-item", {
							class: ((selected(effort.id))?"state-selected":"") +" "+((editing(effort.id))?"state-editing":""),
							onclick: function(){
								viewModels.Hierarchy.updateEffort(effort.id);
							}
						},[
							m(".selectorlist-item-number", [
								m(".button-number", count+1),
								m(".selectorlist-item-edit.button-edit-small",{
									class: (editable(effort.id))?"":"state-hidden",
									onclick: function(){
										viewModels.editMode.set("effort", effort);
									}
								}, m("i.material-icons","build"))
							]),
							m(".selectorlist-item-content", [
								m(".effortselector-title", effort.name),
								m(".effortselector-hidden",[
									m(".effortselector-type", viewModels.typeNames[effort.type]),
									m(".effortselector-description", effort.description),
									m(".effortselector-subheader", "Mensen"),
									m(".effortselector-peoplelist", effort.People.map(function(person){
										return m(".effortselector-peoplelist", person.name);
									})),
								])
							]),
						]);
					}))),
				]);
			} else {
				return [];
			}
		}
	};
};
