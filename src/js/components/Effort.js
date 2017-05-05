var Effort = function(){
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getTask()>0){
				return m(List, {
					title:"Inspanningen",
					selected: viewModels.Hierarchy.getEffort(),
					content: Models.Effort.getContent(),
					onclick: function(id){
						viewModels.Hierarchy.updateEffort(id);
						shiftViewer(2);
					},
					onadd: function(name){
						Models.Effort.newItem(name, function(id){
							viewModels.Hierarchy.updateEffort(id);
							shiftViewer(2);
						});
					}
				});
			}
		}
	};
};
