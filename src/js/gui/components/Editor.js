var Editor = function(){
	return {
		view: function(vnode){
			return m(".editor",{
				class: viewModels.editMode.state() ? "state-edit": "state-hidden"
			}, [

				m(".editor-header",[
					m("span", "Editor"),
						m(".icons-header", [
						m(".save-button", {
							onclick: function(){
								viewModels.editMode.save();
							}
						},"Opslaan"),
						m("i.material-icons", {
							onclick: function(){
								viewModels.editMode.close();
							}
						},"close"),
					]),
				]),

				m(".editor-content",[
					(function(){
						if(viewModels.editMode.isType("effort")){
							return m(EffortEditor);
						} else if(viewModels.editMode.isType("task")){
							return m(TaskEditor);
						}
					})(),

					m(".editor-buttons",[
						m(".button-delete", {
							onclick: function(){
								viewModels.editMode.delete();
							}
						},"Verwijder"),
					]),
				]),
			]);
		}
	};
};
