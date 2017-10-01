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
				content = data;
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
