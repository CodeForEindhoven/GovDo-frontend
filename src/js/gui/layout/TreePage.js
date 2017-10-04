var TreePage = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", "Mission & Team"),
				m(".layout-workspace", [
					m(".layout-column",  m(TaskSelector)),
					m(".layout-column", m(EffortSelector)),
					m(".layout-right", m(Editor))
				])
			];
		}
	};
};
