var ProgramDetails = function(){
	var state = false;
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".programdetails",[
					m(".programdetails-title",
					Models.Task.getParent().name),
					m(".icons-header", [
						m("i.material-icons.edit-button", {
							class: state?"":"state-hidden",
							onclick: function(){
								viewModels.editMode.set("program", Models.Task.getParent());
							}
						}, "build"),
						m("i.material-icons", {
							onclick: function(){
								state = !state;
							},
						}, state?"arrow_drop_up":"arrow_drop_down"),
					]),
					m(".programdetails-mission",{
						class: state?"":"state-hidden"
					},Models.Task.getParent().mission),
				]);
			}
		}
	};
};
