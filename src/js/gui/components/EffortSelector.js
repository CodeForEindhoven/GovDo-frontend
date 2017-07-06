var EffortSelector = function(){
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getTask()>0){
				return m(".taskselector",[
					m(".program-title", [
						"Inspanningen"
					//	viewModels.Hierarchy.getProgramName()
					]),
					m(".tasklist", Models.Effort.getContent().map(function(effort, count){
						return m(".tasklist-task", {
							onclick: function(){
								viewModels.Hierarchy.updateEffort(effort.id);
							}
						},[
							m(".tasklist-task-number.button-number", count+1),
							m(".tasklist-task-title", [
								m("span.tasklist-task-title-name", effort.name),
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
