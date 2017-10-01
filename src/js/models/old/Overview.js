Models.Overview = (function(){
	var content = [];

	function loadContent(callback){
		model.get("overview", {}, function(data){
			content = data;
			if(callback){callback();}
		});
	}

	function getContent(){
		return content;
	}

	function getParents(effortid){
		var parents = [];
		var programcount = 0;
		for(var h in content){
			for(var i in content[h].Programs){
				programcount++;
				for(var j in content[h].Programs[i].Tasks){
					for(var k in content[h].Programs[i].Tasks[j].Efforts){
						if(content[h].Programs[i].Tasks[j].Efforts[k].id === effortid){
							parents.push({
								program: {
									count: programcount,
									id: content[h].Programs[i].id,
									name: content[h].Programs[i].name,
								},
								task: {
									count: parseInt(j)+1,
									id: content[h].Programs[i].Tasks[j].id,
									name: content[h].Programs[i].Tasks[j].name,
								}
							});
						}
					}
				}
			}
		}
		return parents;
	}

	function setParent(parent, effort, callback) {
		console.log(parent);
		model.post("task/"+parent+"/effort", {
			effort: effort
		}, function(data){
			loadContent(callback);
		});
	}

	function removeParent(parent, effort, callback) {
		console.log(parent);
		model.delete("task/"+parent+"/effort", {
			effort: effort
		}, function(data){
			loadContent(callback);
		});
	}

	return {
		loadContent: loadContent,
		getContent: getContent,
		getParents: getParents,
		setParent: setParent,
		removeParent: removeParent
	};
})();
