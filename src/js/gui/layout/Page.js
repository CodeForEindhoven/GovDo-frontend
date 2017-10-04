var Page = function(){
	return {
		view: function(vnode){
			return [
				//Navigation
				m(".layout-nav-top", [
					m(".layout-nav-segment", m(NavBar)),
				]),

				//GoalTree View
				(vm.page() === 0) ? m(TreePage): [],

				//Calendar View
				(vm.page() === 1) ? m(CalendarPage) : [],

				m(".layout-overlay", m(Login)),
			];
		}
	};
};
