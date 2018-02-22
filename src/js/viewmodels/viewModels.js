var viewModels = {};

var vm = (function(){
	var loginPopup = 1;
	var currentPage = 0;

	var currentUser = {user:"", pass:"", node: -1, role: 0};

	try {
		if (typeof(Storage) !== "undefined") {
			var storedUser = localStorage.getItem('planlabuser');
			if(storedUser){
				currentUser = JSON.parse(storedUser);
				loginPopup = 0;
			}
		}
	}
	catch(err) {
		console.log(err);
	}


	var currentFocus;

	var currentProgram;
	var currentTask;
	var currentEffort;
	var currentPerson;
	var currentCreate;

	var currentHover;

	var currentConnection = false;


	var currentEditor;
	var currentUserList = [];

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
			try {
				if (typeof(Storage) !== "undefined") {
					localStorage.removeItem('planlabuser');
					currentUser = {user:"", pass:"", node: -1, role: 0};
					loginPopup = -1;
				} else {
					console.log("no localstorage");
				}
			} catch(err) {
				console.log(err);
			}
		},
		user: function(i){
			if(i !== undefined){
				currentUser = i;
				try {
					if (typeof(Storage) !== "undefined") {
						localStorage.setItem('planlabuser', JSON.stringify(i));
					} else {
						console.log("no localstorage");
					}
				} catch(err) {
					console.log(err);
				}
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
		taskClose : function(i){
			currentTask = undefined;
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
		effortClose : function(i){
			currentEffort = undefined;
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
		create : function(i){
			if(i !== undefined){
				currentCreate = i;
			}
			return currentCreate;
		},
		createClose : function(i){
			currentCreate = undefined;
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
		},
		userlist: function(){
			return currentUserList;
		},
		updateUserList: function(){
			ptrn.getusers(function(resp){
				currentUserList = resp;
				m.redraw();
			});
		}
	};
})();

var createnew = {
	task: function(){
		if(vm.program()){
			var taskcount = vm.program()("task", function(a){return a;}).length+1;
			ptrn.createrelate("task", "", vm.program(), function(t){
				ptrn.createrelate("means", "", t, function(){
				ptrn.createrelate("order", taskcount, t, function(){
				ptrn.createrelate("mode", "0", t, function(){
					vm.taskClose();
					vm.create(t);
				});});});
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
					vm.effortClose();
					vm.create(e);
				});});});});});});});
			});
		}
	}
};
