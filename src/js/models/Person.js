Models.Person = (function(){
	var content = [];

	function loadContent(){
		model.get("people", {}, function(data){
			content = data;
		});
	}

	function getContent(){
		return content;
	}

	function newItem(name, callback){
		model.post("person", {
			name: name,
		}, function(data){
			loadContent();
			callback(data);
		});
	}

	return {
		loadContent: loadContent,
		getContent: getContent,
		newItem: newItem
	};
})();
