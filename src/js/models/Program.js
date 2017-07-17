Models.Program = (function(){
	var content = [];

	function loadContent(){
		model.get("domain", {}, function(data){
			content = data;
		});
	}

	function newItem(item, callback){
		model.post("program", item, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function updateItem(i, callback){
		var item = JSON.parse(JSON.stringify(i));
		var id = item.id;
		delete item.id;
		model.post("program/"+id, item, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function getContent(){
		return content;
	}

	return {
		newItem: newItem,
		updateItem: updateItem,
		loadContent: loadContent,
		getContent: getContent,
	};
})();
