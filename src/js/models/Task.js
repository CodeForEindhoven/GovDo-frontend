Models.Task = (function(){
	var currentView = -1;
	var content = [];
	var name = "";

	function loadContent(){
		model.get("program/"+currentView, {}, function(data){
			content = data.Tasks;
			name = data.name;
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

	function newItem(name, callback){
		model.post("task", {
			program: currentView,
			name: name
		}, function(data){
			loadContent();
			callback(data.id);
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
