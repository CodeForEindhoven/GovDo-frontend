viewModels.Hierarchy = (function(){
	var currentProgram = -1;
	var currentTask = -1;
	var currentEffort = -1;

	function updateProgram(p){
		currentProgram = p;
		currentTask = -1;
		currentEffort = -1;

		Models.Task.updateContent(currentProgram);
	}

	function getProgram(){
		return currentProgram;
	}

	function getProgramName(){
		var content = Models.Program.getContent();
		if(content.length>0 && currentProgram>0){
			return content[currentProgram].name;
		}
		return "";
	}

	function updateTask(p){
		currentTask = p;
		currentEffort = -1;

		Models.Effort.updateContent(currentTask);
	}

	function getTask(){
		return currentTask;
	}

	function updateEffort(p){
		currentEffort = p;
	}

	function getEffort(){
		return currentEffort;
	}

	return {
		updateProgram: updateProgram,
		updateTask: updateTask,
		updateEffort: updateEffort,

		getProgram:getProgram,
		getTask: getTask,
		getEffort: getEffort,

		getProgramName: getProgramName
	};
})();
