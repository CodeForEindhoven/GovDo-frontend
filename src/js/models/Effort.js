Models.Effort = (function(){
	var currentView = -1;
	var content = [];
	var name = "";

	function loadContent(){
		model.get("task/"+currentView, {}, function(data){
			content = data.Efforts;
			name = data.name;
		});
	}

	function getContent(){
		return content;
	}

	function getName(){
		return name;
	}

	function updateContent(program){
		if(program!==currentView){
			currentView = program;
			if(program>0){
				loadContent();
			}
		}
	}

	function newItem(name,callback){
		model.post("effort", {
			task: currentView,
			name: name
		}, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function updateItem(id, name, callback){
		model.post("effort/"+id, {
			name: name
		}, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function setType(id, type){
		model.post("details/"+id+"/type", {
			type: type
		}, function(){
			loadContent();
		});
	}

	function setPerson(id, person){
		console.log(person);
		model.post("details/"+id+"/person", {
			person: person
		}, function(){
			loadContent();
		});
	}

	function removePerson(id, person){
		console.log(person);
		model.post("details/"+id+"/removeperson", {
			person: person
		}, function(){
			loadContent();
		});
	}

	return {
		newItem: newItem,
		updateItem: updateItem,

		setType: setType,

		setPerson: setPerson,
		removePerson: removePerson,

		loadContent: loadContent,
		getContent: getContent,
		getName: getName,
		updateContent:updateContent
	};
})();
