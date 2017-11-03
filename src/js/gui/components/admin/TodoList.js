var TodoList = function(){

	//If the person is the leader of any efforts of type project
	function isLeader(){
		return ptrn("#"+vm.user().node+" role:leader effort type:0 effort", function(ef){
			return ef.value();
		}).length > 0;
	}

	return {
		view: function(vnode){
			return m(".admin",[
				m(".admin-header",[
					m(".admin-title.subtitle", [
						m("span", "Taaklijst")
					]),
					isLeader() ? m(".admin-tasks",[
						//(FuzzyDate.currentWeek(new Date())%2===0)
						m(".admin-tasks-feedback", {
							onclick: function(){
								vnode.attrs.onfeedback();
							}
						}, "Voortgang week 52")
					]) : []
				])
			]);
		}
	};
};
