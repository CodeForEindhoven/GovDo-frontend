var Page = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-nav-top", m(NavBar)),
				m(".layout-nav-left", m(ProgramBar)),
				m(".layout-workspace", [
					m(".layout-column", m(TaskSelector)),
					m(".layout-column", "asdf"),
					m(".layout-column", "asdf")
				])
				//m(Viewer),
			];
		}
	};
};
