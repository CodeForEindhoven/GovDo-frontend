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
				currentTask = i;
				currentEffort = undefined;
			}
			return currentTask;
		},
		effort : function(i){
			if(i !== undefined){
				currentEffort = i;
			}
			return currentEffort;
		}
	};

})();
