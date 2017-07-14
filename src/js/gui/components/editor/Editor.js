var Editor = function(){
	return {
		view: function(vnode){
			return m(".editor",{
				class: viewModels.editMode.state() ? "state-edit": "state-hidden"
			}, [
				//Header
				m(".editor-header",[
					m("span", "Editor"),
					m(".icons-header .close-button", {
						onclick: function(){
							viewModels.editMode.save();
						}
					}, [
						m(".save-button", (viewModels.editMode.savingState())?"Opslaan...":"Opslaan"),
						m("i.material-icons", "close"),
					]),
				]),

				//Content
				(function(){
					if(viewModels.editMode.state()) {
						return m(".editor-content",{
							onbeforeremove: function(){
								return new Promise(function(resolve) {
									setTimeout(resolve, 400);
								});
							}
						},[
							(function(){
								if(viewModels.editMode.isType("effort")){
									return m(EffortEditor);
								} else if(viewModels.editMode.isType("task")){
									return m(TaskEditor);
								} else if(viewModels.editMode.isType("program")){
									return m(ProgramEditor);
								}
							})(),
							
							//Delete item
							m(".editor-buttons",[
								m(".button-delete", {
									onclick: function(){
										viewModels.editMode.delete();
									}
								},"Verwijder"),
							]),
						]);
					}
					return [];
				})(),
			]);
		}
	};
};
