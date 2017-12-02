var viewModels = {};

var vm = (function(){
	var loginPopup = -1;
	var currentPage = 0;

	var currentUser = {user:"", pass:"", node: -1, role: 0};
	var storedUser = localStorage.getItem('planlabuser');
	if(storedUser){
		currentUser = JSON.parse(storedUser);
		loginPopup = 0;
	}

	var currentFocus;

	var currentProgram;
	var currentTask;
	var currentEffort;
	var currentPerson;

	var currentHover;

	var currentConnection = false;


	var currentEditor;

	return {
		connecting: function(i){
			if(i !== undefined){
				currentConnection = i;
				m.redraw();
			}
			return currentConnection;
		},
		page: function(i){
			if(i !== undefined){
				currentPage = i;
			}
			return currentPage;
		},
		login: function(i){
			if(i !== undefined){
				loginPopup = i;
			}
			return loginPopup;
		},
		logout: function(){
			localStorage.removeItem('planlabuser');
			currentUser = {user:"", pass:"", node: -1, role: 0};
			loginPopup = -1;
		},
		user: function(i){
			if(i !== undefined){
				currentUser = i;
				localStorage.setItem('planlabuser', JSON.stringify(i));
			}
			return currentUser;
		},
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
		person : function(i){
			if(i !== undefined){
				currentPerson = i;
			}
			return currentPerson;
		},
		hover : function(i){
			if(i !== undefined){
				currentHover = i;
			}
			return currentHover;
		},
		unhover: function(){
			currentHover = undefined;
		},
		focus : function(i){
			if(i !== undefined){
				currentFocus = i;
			}
			return currentFocus;
		},
		closeall: function(){
			currentEffort = undefined;
			currentTask = undefined;
			currentProgram = undefined;
		},
		edit: function(i){

			if(i !== undefined){
				if(loginPopup === 0){
					currentEditor = i;
				} else {
					loginPopup = 1;
				}
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
				ptrn.createrelate("mode", "-1", e, function(){
				ptrn.createrelate("startdate", "_/_/_", e, function(){
				ptrn.createrelate("enddate", "_/_/_", e, function(){
					vm.edit(e);
				});});});});});});});
			});
		}
	}
};
