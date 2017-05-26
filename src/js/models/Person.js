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

	return {
		loadContent: loadContent,
		getContent: getContent,
	};
})();
