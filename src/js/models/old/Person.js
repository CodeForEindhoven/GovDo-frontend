Models.Person = (function(){
	var people = [];
	var teams = [];

	function loadPeople(){
		model.get("people", {}, function(data){
			people = data;
		});
	}

	function getPeople(){
		return people;
	}

	function loadTeams(){
		model.get("teams", {}, function(data){
			teams = data;
		});
	}

	function getTeams(){
		return teams;
	}

	function newItem(name, callback){
		model.post("person", {
			name: name,
		}, function(data){
			loadPeople();
			callback(data);
		});
	}

	return {
		loadPeople: loadPeople,
		getPeople: getPeople,

		loadTeams: loadTeams,
		getTeams: getTeams,

		newItem: newItem
	};
})();
