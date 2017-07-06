var Page = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-nav-top", m(NavBar)),
				m(".layout-nav-left", m(ProgramBar)),
				m(".layout-workspace", [
					m(".layout-column", m(TaskSelector)),
					m(".layout-column", m(EffortSelector)),
				]),
				m(".layout-editor", m(Editor))
				//m(Viewer),
			];
		}
	};
};
