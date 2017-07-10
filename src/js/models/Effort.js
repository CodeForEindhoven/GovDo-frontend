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

	function newItem(name, description, type, people, callback){
		model.post("effort", {
			task: currentView,
			name: name,
			description: description,
			type: type,
			people: people,
		}, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function updateItem(id, name, description, type, people, callback){
		model.post("effort/"+id, {
			name: name,
			description: description,
			type: type,
			people: people,
		}, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function deleteItem(id, callback) {
		model.delete("effort/"+id, {}, function(data){
			loadContent();
			callback(data);
		});
	}

	return {
		newItem: newItem,
		updateItem: updateItem,
		deleteItem: deleteItem,

		loadContent: loadContent,
		getContent: getContent,
		getName: getName,
		updateContent:updateContent
	};
})();
