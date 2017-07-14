Models.Task = (function(){
	var currentView = -1;
	var content = [];

	function loadContent(){
		model.get("program/"+currentView, {}, function(data){
			content = data.Tasks;
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

	function newItem(item, callback){
		item.program = currentView;
		model.post("task", item, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function updateItem(i, callback){
		var item = JSON.parse(JSON.stringify(i));
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
		updateContent:updateContent
	};
})();
