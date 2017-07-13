viewModels.editMode = (function(){
	var state = false;
	var type = "";
	var content = {};

	return {
		state: function(){return state;},
		isType: function(t){return (type === t);},
		content: function(){return content;},

		setContent: function(key, value){
			content[key] = value;
		},

		set: function(t, c){
			function open(){
				state = true;
				type = t;
				if(c){
					content = JSON.parse(JSON.stringify(c)); //DEEP COPY CONTENT
				}
				m.redraw();
			}

			if(state){
				viewModels.editMode.close();
				setTimeout(open, 400);
			} else {
				open();
			}

		},

		new: function(type){
			if(type === 'effort'){
				viewModels.editMode.set(type,{
					id: -1,
					name: "",
					description: "",
					type: -1,
					People:[]
				});
			}
			if(type === 'task'){
				viewModels.editMode.set(type,{
					id: -1,
					name: "",
					means: "",
				});
			}
		},

		close: function(){
			viewModels.editMode.save(function(){
				state = false;
				type = "";
				content = {};
			});
		},

		save: function(callback){
			console.log("save");
			if(type==="effort"){
				console.log("effort");
				if(content.id===-1){
					console.log("new");
					Models.Effort.newItem(content, function(id){
						viewModels.Hierarchy.updateEffort(content.id);
						//viewModels.editMode.close();
						if(callback){callback();}
					});
				} else {
					console.log("update");
					Models.Effort.updateItem(content, function(id){
						viewModels.Hierarchy.updateEffort(content.id);
						///.editMode.close();
						if(callback){callback();}
					});
				}
			} else if(type==="task"){
				console.log("task");
				if(content.id===-1){
					console.log("new");
					Models.Task.newItem(content, function(id){
						viewModels.Hierarchy.updateTask(content.id);
						//viewModels.editMode.close();
						if(callback){callback();}
					});
				} else {
					console.log("update");
					Models.Task.updateItem(content, function(id){
						viewModels.Hierarchy.updateTask(content.id);
						//viewModels.editMode.close();
						if(callback){callback();}
					});
				}
			}
		},

		delete: function(){
			console.log("delete");
			if (window.confirm("Weet u zeker dat u dit wilt verwijderen?") === true) {
				if(type==="effort"){
					console.log("effort");
					if(content.id===-1){
						viewModels.editMode.close();
					} else {
						Models.Effort.deleteItem(content.id,function(){
							viewModels.editMode.close();
						});
					}
				}
			}
		}
	};
})();
