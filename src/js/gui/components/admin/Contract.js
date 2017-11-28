var Contract = function(){

	//If the person is the leader of any efforts of type project
	function isLeader(){
		return ptrn("#"+vm.user().node+" role:leader effort type:0 effort", function(ef){
			return ef.value();
		}).length > 0;
	}

	function hasDoneSession(session){
		return (ptrn("#"+vm.user().node+" role:leader effort type:0 effort", function(ef){
			return ef("feedback:"+session.value()).id();
		}).indexOf(-1)<0);
	}

	return {
		view: function(vnode){
			return m(".admin",[
				m(".admin-header",[
					m(".admin-title.subtitle", [
						m("span", "Contract")
					]),
					m(NumberRoller, {
						value: parseInt(ptrn("#"+vm.user().node+" contract").value()),
						oninput: function(inpt){
							ptrn("#"+vm.user().node+" contract").update(inpt);
							m.redraw();
						}
					}),
					m("span", "uur per week, waarvan"),
					m(NumberRoller, {
						value: parseInt(ptrn("#"+vm.user().node+" plannable").value()),
						oninput: function(inpt){
							ptrn("#"+vm.user().node+" plannable").update(inpt);
							m.redraw();
						}
					}),
					m("span", "uur inplanbaar")
				])
			]);
		}
	};
};
