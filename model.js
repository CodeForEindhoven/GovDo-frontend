var model = {
	team: "",
	tasks: []
};

var api = "http://127.0.0.1:8000/";

var load = function(){
	return m.request({
		method: "GET",
		url: api+"team",
	}).then(function(result) {
		model = result;
		console.log(model);
	});
};

function addTask(title){
	m.request({
		method: "POST",
		url: api+"task",
		data: {
			title: title
		}
	}).then(function(result) {
		model = result;
		console.log(model);
	});
}

function addEffort(task, title){
	m.request({
		method: "POST",
		url: api+"effort",
		data: {
			task: task,
			title: title
		}
	}).then(function(result) {
		model = result;
		console.log(model);
	});
}

function addEffortPerson(task, effort, person){
	m.request({
		method: "POST",
		url: api+"effort/person",
		data: {
			task: task,
			effort: effort,
			person: person
		}
	}).then(function(result) {
		model = result;
		console.log(model);
	});
}
