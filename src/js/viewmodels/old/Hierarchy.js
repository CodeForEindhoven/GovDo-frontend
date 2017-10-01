viewModels.Hierarchy = (function(){
	var currentProgram = -1;
	var currentTask = -1;
	var currentEffort = -1;
	var currentPerson = -1;

	function updateProgram(p){
		currentProgram = p;
		currentTask = -1;
		currentEffort = -1;
		Models.Task.updateContent(currentProgram);
	}

	function getProgram(){
		return currentProgram;
	}

	function updateTask(p){
		if(currentTask != p){
			currentTask = p;
		} else {
			currentTask = -1;
		}
		currentEffort = -1;

		Models.Effort.updateContent(currentTask);
	}

	function getTask(){
		return currentTask;
	}

	function updateEffort(p){
		if(currentEffort != p){
			currentEffort = p;
		} else {
			currentEffort = -1;
		}
	}

	function getEffort(){
		return currentEffort;
	}

	function updatePerson(p){
		console.log(p);
		currentPerson = p;
	}

	function getPerson(){
		return currentPerson;
	}

	function jumpTo(p,t,e){
		updateProgram(p);
		updateTask(t);
		updateEffort(e);
	}

	return {
		updatePerson: updatePerson,
		updateProgram: updateProgram,
		updateTask: updateTask,
		updateEffort: updateEffort,

		getProgram:getProgram,
		getTask: getTask,
		getEffort: getEffort,

		jumpTo: jumpTo
	};
})();
