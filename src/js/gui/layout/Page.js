var Page = function(){
	return {
		view: function(vnode){
			return [
				//Navigation
				m(".layout-nav-top", [
					m(".layout-nav-segment", m(NavBar)),
				]),

				//GoalTree View
				(vm.page() === 0) ? m(".layout-workspace", [
					//m(".layout-column .layout-nav-left", m(ProgramBar)),
					m(".layout-column",  m(TaskSelector)),
							//m(".layout-vertical-row", m(ProgramDetails)),
					m(".layout-column", m(EffortSelector)),
					m(".layout-right", m(Editor))
				]) : [],

				//Calendar View
				(vm.page() === 1) ? m(CalendarPage) : [],

				m(".layout-overlay", m(Login)),
			];
		}
	};
};
