var TodoList = function(){

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

	function isProgramLeader(){
		return ptrn("#"+vm.user().node+" role:leader program", function(p){return p;}).length > 0;
	}

	function effortApproval(callback){
		return ptrn("#"+vm.user().node+" role:leader program task effort mode:-2", function(m){return m("effort");}).map(callback);
	}

	return {
		view: function(vnode){
			return m(".admin",[
				m(".admin-header",[
					m(".admin-title.subtitle", [
						m("span", "Voortgangs Sessies")
					]),
					isLeader() ? m(".admin-tasks",[
						//(FuzzyDate.currentWeek(new Date())%2===0)
						ptrn("feedbacksession", function(session){
							return m(".admin-tasks-feedback", {
								class: hasDoneSession(session) ? "state-done":"",
								onclick: function(){
									vnode.attrs.onfeedback(session);
								}
							}, "Voortgang "+session.value());
						}).reverse().emptyState(m(".selectorlist-state.state-empty", "Geen Voorgangs sessies om in te vullen"))
					]) : [],

					m(".admin-title.subtitle", [
						m("span", "Goedkeuring")
					]),
					isProgramLeader() ? m(".admin-tasks",[
						//(FuzzyDate.currentWeek(new Date())%2===0)
						effortApproval(function(effort){
							return m(".admin-tasks-approval", {
								onclick: function(){
									//vnode.attrs.onfeedback(session);
									vm.program(effort("task")("program"));
									vm.task(effort("task"));
									vm.effort(effort);
									vm.focus(vm.program());
									vm.page(0);
								}
							}, effort.value());
						}).emptyState(m(".selectorlist-state.state-empty", "Alle Inspanningen zijn goedgekeurd!"))
					]) : []
				])
			]);
		}
	};
};
