var DashboardPage = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", "dashboard options"),
				m(".layout-workspace", [
					m("div", "dashboard")
				])
			];
		}
	};
};
