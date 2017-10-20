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

				//Dashboard View
				(vm.page() === 2) ? m(DashboardPage) : [],

				//Feedback View
				(vm.page() === 3) ? m(CalendarPage) : [],

				//Admin View
				(vm.page() === 4) ? m(AdminPage) : [],

				m(".layout-overlay", m(Login)),
			];
		}
	};
};
