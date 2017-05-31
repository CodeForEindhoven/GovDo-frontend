Models.Program = (function(){
	var content = [];

	function loadContent(){
		model.get("domain", {}, function(data){
			content = data;
		});
	}

	function newItem(name, mission, callback){
		model.post("program", {
			name: name,
			mission: mission,
		}, function(data){
			loadContent();
			callback(data.id);
		});
	}

	function updateItem(id, name, mission, callback){
		model.post("program/"+id, {
			name: name,
			mission: mission,
		}, function(data){
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
