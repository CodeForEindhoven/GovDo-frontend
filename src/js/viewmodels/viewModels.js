var viewModels = {};

var vm = (function(){
	var currentProgram;
	var currentTask;
	var currentEffort;

	return {
		program : function(i){
			if(i !== undefined){
				currentProgram = i;
				currentTask = undefined;
				currentEffort = undefined;
			}
			return currentProgram;
		},
		task : function(i){
			if(i !== undefined){
				if(ptrn.compare(currentTask, i)){
					currentTask = undefined;
				} else {
					currentTask = i;
				}
				currentEffort = undefined;
			}
			return currentTask;
		},
		effort : function(i){
			if(i !== undefined){
				if(ptrn.compare(currentEffort, i)){
					currentEffort = undefined;
				} else {
					currentEffort = i;
				}
			}
			return currentEffort;
		}
	};

})();
