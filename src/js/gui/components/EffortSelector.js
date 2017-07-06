var EffortSelector = function(){
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getTask()>0){
				return m(".selector",[
					m(".program-title", [
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
								m(".effortselector-title", [
									m("span.effortselector-title-name", effort.name),
								]),
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
