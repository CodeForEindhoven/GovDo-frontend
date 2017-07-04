var Page = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-nav-top", m(NavBar)),
				m(".layout-nav-left", m(ProgramBar)),
				m(".layout-workspace", "sadf")
				//m(Viewer),
			];
		}
	};
};
