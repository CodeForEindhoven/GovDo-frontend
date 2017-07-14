Models.Search = (function(){

	var content = [];
	var waiting = false;
	var next;

	function loadContent(query){
		if(waiting){
			next = query;
		} else {
			waiting = true;
			model.post("search", {
				query: query
			}, function(data){
				content = data.filter(function(result){
					return (result.Tasks[0])?true:false;
				}).map(function(result){
					result.task = result.Tasks[0].name;
					result.program = result.Tasks[0].Programs[0].name;
					return result;
				});

				waiting = false;
				if(next){
					loadContent(next);
					next = undefined;
				}
			});
		}

	}

	function getContent(){
		return content;
	}

	return {
		loadContent: loadContent,
		getContent: getContent,
	};
})();
