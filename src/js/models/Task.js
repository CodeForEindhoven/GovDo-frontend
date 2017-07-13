Models.Task = (function(){
	var currentView = -1;
	var content = [];
	var name = "";

	function loadContent(){
		model.get("program/"+currentView, {}, function(data){
			content = data.Tasks;
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

	function newItem(item, callback){
		item.program = currentView;
		model.post("task", item, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function updateItem(item, callback){
		var id = item.id;
		delete item.id;
		model.post("task/"+id, item, function(data){
			loadContent();
			callback(data.id);
		});
	}

	return {
		newItem: newItem,
		updateItem: updateItem,
		loadContent: loadContent,
		getContent: getContent,
		getName: getName,
		updateContent:updateContent
	};
})();
