Models.Program = (function(){
	var content = [];

	function loadContent(){
		model.get("domain", {}, function(data){
			content = data;
		});
	}

	function newItem(name, callback){
		model.post("program", {
			name: name
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
		loadContent: loadContent,
		getContent: getContent,
	};
})();
