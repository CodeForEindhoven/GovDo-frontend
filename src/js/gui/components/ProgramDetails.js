var ProgramDetails = function(){
	var state = false;
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".programdetails",[
					m(".programdetails-title", 
					viewModels.Hierarchy.getProgramDetails().name),
					m("i.material-icons", {
						onclick: function(){
							state = !state;
						},
						class: state?"state-hidden":""
					}, "arrow_drop_down"),
					m("i.material-icons", {
						onclick: function(){
							state = !state;
						},
						class: state?"":"state-hidden"
					}, "arrow_drop_up"),
					m(".programdetails-mission",{
						class: state?"":"state-hidden"
					},viewModels.Hierarchy.getProgramDetails().mission),
				]);
			}
		}
	};
};
