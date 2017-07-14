var Page = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-nav-top", m(NavBar)),
				m(".layout-workspace", [
					m(".layout-column .layout-nav-left", m(ProgramBar)),
					m(".layout-column", [
						m(".layout-vertical", [
							m(".layout-vertical-row", m(ProgramDetails)),
							m(".layout-vertical-bottom", m(TaskSelector))
						]),
					]),
					m(".layout-column .layout-vertical-offset", m(EffortSelector)),
					m(".layout-column .layout-vertical-offset", m(Editor))
				]),
				//m(Viewer),
			];
		}
	};
};
