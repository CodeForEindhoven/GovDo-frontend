viewModels.editMode = (function(){
	var state = false;
	var type = "";
	var content = {};

	var savingState = false;

	return {
		state: function(){return state;},
		savingState: function(){return savingState;},
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
				viewModels.editMode.save(function(){
					setTimeout(open, 400);
				});

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
					People:[],
					mode: -1,
				});
			}
			if(type === 'task'){
				viewModels.editMode.set(type,{
					id: -1,
					name: "",
					means: "",
					mode: -1,
				});
			}
		},

		close: function(callback){
			state = false;
			type = "";
			content = {};
		},

		save: function(callback){
			savingState = true;
			if(type==="effort"){
				if(content.id===-1){
					Models.Effort.newItem(content, function(id){
						savingState = false;
						//viewModels.Hierarchy.updateEffort(content.id);
						viewModels.editMode.close();
						if(callback){callback();}
					});
				} else {
					Models.Effort.updateItem(content, function(id){
						savingState = false;
						//viewModels.Hierarchy.updateEffort(content.id);
						viewModels.editMode.close();
						if(callback){callback();}
					});
				}
			} else if(type==="task"){
				if(content.id===-1){
					Models.Task.newItem(content, function(id){
						savingState = false;
						//viewModels.Hierarchy.updateTask(content.id);
						viewModels.editMode.close();
						if(callback){callback();}
					});
				} else {
					Models.Task.updateItem(content, function(id){
						savingState = false;
						//viewModels.Hierarchy.updateTask(content.id);
						viewModels.editMode.close();
						if(callback){callback();}
					});
				}
			} else if(type==="program"){
				if(content.id===-1){
					Models.Program.newItem(content, function(id){
						savingState = false;
						viewModels.Hierarchy.updateProgram(content.id);
						viewModels.editMode.close();
						if(callback){callback();}
					});
				} else {
					Models.Program.updateItem(content, function(id){
						savingState = false;
						viewModels.Hierarchy.updateProgram(content.id);
						viewModels.editMode.close();
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
