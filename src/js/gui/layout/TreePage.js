var TreePage = function(){
	var currentPage = 1;
	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", [
					m(".optionbar", [
						m(".optionbar-section", [
							m(".sub-navigation-label", "Doelenboom"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 0;},
								class: (currentPage===0)? "state-selected":""
							}, "Missie & Team"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 1;},
								class: (currentPage===1)? "state-selected":""
							}, "Opgaven & Inspanningen"),
						]),
					])
				]),
				m(".layout-workspace", [
					(currentPage===0) ? [
						m(".layout-column", m(MissionVision)),
						m(".layout-column", m(TeamList)),
					] : [],
					(currentPage===1) ? [
						m(".layout-column",  m(TaskSelector)),
						m(".layout-column", m(EffortSelector)),
					] : [],

					m(".layout-right", m(Editor))
				])
			];
		}
	};
};
