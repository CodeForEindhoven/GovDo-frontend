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
		var list = [];
		for(var i in content){
			list.push({
				type: "subtitle",
				name: content[i].name
			});
			for(var j in content[i].Programs){
				list.push(content[i].Programs[j]);
			}
		}
		//return list;
		console.log(list);
		return list;
	}

	return {
		newItem: newItem,
		updateItem: updateItem,
		loadContent: loadContent,
		getContent: getContent,
	};
})();
