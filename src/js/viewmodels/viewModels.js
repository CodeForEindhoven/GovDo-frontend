var viewModels = {};

var vm = (function(){
	var currentProgram;
	var currentTask;
	var currentEffort;

	var currentEditor;

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
		},
		edit: function(i){
			if(i !== undefined){
				currentEditor = i;
			}
			return currentEditor;
		},
		editClose: function(){
			currentEditor = undefined;
		}
	};

})();
