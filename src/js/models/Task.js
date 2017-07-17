Models.Task = (function(){
	var currentView = -1;
	var content = [];
	var parent = {};

	function loadContent(){
		model.get("program/"+currentView, {}, function(data){
			parent = {
				name: data.name,
				mission: data.mission,
				id: data.id
			};
			content = data.Tasks;
		});
	}

	function getContent(){
		return content;
	}

	function getParent(){
		return parent;
	}

	function updateContent(program){
		//if(program!==currentView){
			currentView = program;
			if(program>0){
				loadContent();
			}
		//}
	}

	function newItem(i, callback){
		var item = JSON.parse(JSON.stringify(i));
		item.program = currentView;
		delete item.id;
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

	function deleteItem(id, callback) {
		model.delete("task/"+id, {}, function(data){
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
		getParent: getParent,
		updateContent:updateContent
	};
})();
