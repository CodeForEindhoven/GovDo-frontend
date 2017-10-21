var AdminPage = function(){
	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", [
					m(".optionbar", [
						m(".sub-navigation-label", "Functioneel Beheer"),
						m(".optionbar-option", {}, "Gebruikers"),
					])
				]),
				m(".layout-workspace", [
					m(AdminUsers)
				])
			];
		}
	};
};
