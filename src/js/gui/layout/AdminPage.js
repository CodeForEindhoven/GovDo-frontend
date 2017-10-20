var AdminPage = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", "admin subpages"),
				m(".layout-workspace", [
					m("div", "adminpage")
				])
			];
		}
	};
};
