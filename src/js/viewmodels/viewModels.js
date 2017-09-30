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
			ptrn.create("task", "", function(t){
				ptrn.relate(vm.program(), t);
				ptrn.create("means", "", function(a){ptrn.relate(t,a);});
				ptrn.create("kpi", "", function(a){ptrn.relate(t,a);});
				ptrn.create("order", "1", function(a){ptrn.relate(t,a);});
				ptrn.create("mode", "-1", function(a){ptrn.relate(t,a);});
				vm.edit(t);
			});
		}
	},
	effort: function(){
		if(vm.task()){
			ptrn.create("effort", "", function(e){
				ptrn.relate(vm.task(), e);
				ptrn.create("description", "", function(a){ptrn.relate(e,a);});
				ptrn.create("endproduct", "", function(a){ptrn.relate(e,a);});
				ptrn.create("type", "", function(a){ptrn.relate(e,a);});
				ptrn.create("order", "1", function(a){ptrn.relate(e,a);});
				ptrn.create("mode", "-1", function(a){ptrn.relate(e,a);});
				vm.edit(e);
			});
		}
	}
};
