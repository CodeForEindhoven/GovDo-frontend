var model = {
	get: function(adress,data,callback){
		m.request({
			method: "GET",
			url: config.api_endpoint+adress
		}).then(callback);
	},

	post: function(adress,data,callback){
		m.request({
			method: "POST",
			url: config.api_endpoint+adress,
			data: data
		}).then(callback);
	}
};

/*

var model = {};
model.group = {
	name: "",
	Tasks: [],
	People: []
};

var api = "http://127.0.0.1:8000/";

var getGroup = function(){
	return m.request({
		method: "GET",
		url: api+"group/3",
	}).then(function(result) {
		model.group = result[0];
		console.log(model);
	});
};

function addTask(name){
	m.request({
		method: "POST",
		url: api+"task",
		data: {
			name: name,
			group: model.group.id
		}
	}).then(function() {
		getGroup();
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
*/
