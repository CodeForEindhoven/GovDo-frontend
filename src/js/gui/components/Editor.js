var Editor = function(){
	return {
		view: function(vnode){
			return m(".editor",{
				class: viewModels.editMode.state() ? "state-edit": "state-hidden"
			}, [
				(function(){
					if(viewModels.editMode.isType("effort")){
						return m(EffortEditor);
					} else if(viewModels.editMode.isType("task")){
						return m(TaskEditor);
					}
				})(),
				m(".editor-buttons",[
					//save
					m(".button-edit", {
						onclick: function(){
							viewModels.editMode.save();
						}
					},"Opslaan"),
					//
					m(".button", {
						onclick: function(){
							viewModels.editMode.close();
						}
					},"Annuleer"),
					m(".button-right", {
						onclick: function(){
							viewModels.editMode.delete();
						}
					},"Verwijder"),
				])
			]);
		}
	};
};
