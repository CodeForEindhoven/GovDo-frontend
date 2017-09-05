var Page = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-nav-top", m(NavBar)),
				m(".layout-workspace", [
					m(".layout-column .layout-nav-left", m(ProgramBar)),
					m(".layout-column",  m(TaskSelector)),
							//m(".layout-vertical-row", m(ProgramDetails)),
					m(".layout-column", m(EffortSelector)),
					m(".layout-column", m(Editor))
				]),
				//m(Viewer),
			];
		}
	};
};
