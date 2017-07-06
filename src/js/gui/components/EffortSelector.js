var EffortSelector = function(){
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getTask()>0){
				return m(".selector",[
					m(".selector-header", [
						"Inspanningen"
					//	viewModels.Hierarchy.getProgramName()
					]),
					m(".selectorlist", Models.Effort.getContent().map(function(effort, count){
						return m(".selectorlist-item", {
							onclick: function(){
								viewModels.Hierarchy.updateEffort(effort.id);
							}
						},[
							m(".selectorlist-item-number.button-number", count+1),
							m(".selectorlist-item-content", [
								m(".effortselector-title", effort.name),
								m(".effortselector-subheader", "type"),
								m(".effortselector-type", effort.description),
								m(".effortselector-subheader", "mensen"),
								m(".effortselector-peoplelist", effort.People.map(function(person){
									return m(".effortselector-peoplelist", person.name);
								})),
							]),
						]);
					})),
				]);
			} else {
				return m(".message", "no content");
			}
		}
	};
};
