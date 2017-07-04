var TaskSelector = function(){
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".program-title", [
					viewModels.Hierarchy.getProgramName()
				]);
			} else {
				return m(".");
			}
		}
	};
};
