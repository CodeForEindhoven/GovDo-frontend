Models.Search = (function(){
	var content = [];

	function loadContent(){
		model.get("search", {}, function(data){
			content = data.map(function(result){
				result.task = result.Tasks[0].name;
				result.program = result.Tasks[0].Programs[0].name;

				return result;
			});
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
