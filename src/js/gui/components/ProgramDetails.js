var ProgramDetails = function(){
	var state = false;
	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getProgram()>0){
				return m(".programdetails",[
					m(".programdetails-title", {
						onclick: function(){
							state = !state;
						}
					},viewModels.Hierarchy.getProgramDetails().name),
					m(".programdetails-mission",{
						class: state?"":"state-hidden"
					},viewModels.Hierarchy.getProgramDetails().mission),
				]);
			}
		}
	};
};
