Models.Effort = (function(){
	var currentView = -1;
	var content = [];

	function loadContent(){
		model.get("task/"+currentView, {}, function(data){
			content = data.Efforts;
		});
	}

	function getContent(){
		return content;
	}

	function updateContent(program){
		if(program!==currentView){
			currentView = program;
			if(program>0){
				loadContent();
			}
		}
	}

	function newItem(i, callback){
		var item = JSON.parse(JSON.stringify(i));
		item.task = currentView;
		item.people = item.People;
		delete item.People;
		delete item.id;

		model.post("effort", item, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function updateItem(i, callback){
		//copy file =
		var item = JSON.parse(JSON.stringify(i));
		var id = item.id;
		delete item.id;

		item.people = item.People;
		delete item.People;
		model.post("effort/"+id, item, function(data){
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
		updateContent:updateContent
	};
})();
