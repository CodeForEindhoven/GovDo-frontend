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

var createnew = {
	task: function(){
		if(vm.program()){
			var taskcount = vm.program()("task", function(a){return a;}).length+1;
			ptrn.createrelate("task", "", vm.program(), function(t){
				ptrn.createrelate("means", "", t, function(){
				ptrn.createrelate("kpi", "", t, function(){
				ptrn.createrelate("order", taskcount, t, function(){
				ptrn.createrelate("mode", "-1", t, function(){
					vm.edit(t);
				});});});});
			});
		}
	},
	effort: function(){
		if(vm.task()){
			var effortcount = vm.task()("effort", function(a){return a;}).length+1;
			ptrn.createrelate("effort", "", vm.task(), function(e){
				ptrn.createrelate("description", "", e, function(){
				ptrn.createrelate("endproduct", "", e, function(){
				ptrn.createrelate("type", "", e, function(){
				ptrn.createrelate("order", effortcount, e, function(){
				ptrn.createrelate("mode", "", e, function(){
				ptrn.createrelate("startdate", "_/_/_", e, function(){
				ptrn.createrelate("enddate", "_/_/_", e, function(){
					vm.edit(e);
				});});});});});});});
			});
		}
	}
};
