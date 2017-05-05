Models.Details = (function(){
	var currentView = -1;
	var content = {
		type: -1,
		People: []
	};

	function loadContent(){
		model.get("effort/"+currentView, {}, function(data){
			content = data[0].Efforts;
			name = data[0].name;
		});
	}

	function getContent(){
		return content;
	}

	function getName(){
		return name;
	}

	function updateContent(program){
		if(program!==currentView){
			currentView = program;
			if(program>0){
				loadContent();
			}
		}
	}

	function newItem(name){
		model.post("effort/"+currentView, {
			name: name
		}, function(data){
			getContent();
			onclick(data.id);
		});
	}

	return {
		newItem: newItem,
		loadContent: loadContent,
		getContent: getContent,
		getName: getName,
		updateContent:updateContent
	};
})();
