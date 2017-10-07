var CalendarOptions = function(){
	return {
		view: function(vnode){
			return m(".optionbar.calendar-optionbar",[
				m(".calendar-sub-navigation",[
					m(".sub-navigation-label", "Kalender controle"),
//					m(".sub-navigation-label", "XXXXXX"),
//					m(".sub-navigation-label", "XXXXXX"),
				]),

				m(".calendar-options",[
					m(".optionbar-option", {
						onclick: function(){
							vnode.attrs.setDate(FuzzyDate.prevMonth(new Date()));
						}
					}, "Deze Week"),

					m(".optionbar-option", {
						class: (vnode.attrs.currentScale===1) ? "state-selected":"",
						onclick: function(){
							vnode.attrs.setScale(1);
						}
					}, "Weken"),
					m(".optionbar-option", {
						class: (vnode.attrs.currentScale===2) ? "state-selected":"",
						onclick: function(){
							vnode.attrs.setScale(2);
						}
					}, "Maanden"),


					m(".optionbar-option", {
						class: (vnode.attrs.currentView===1) ? "state-selected":"",
						onclick: function(){
							vnode.attrs.setView(1);
						}
					}, "Uren per week"),

					m(".optionbar-option", {
						class: (vnode.attrs.currentView===2) ? "state-selected":"",
						onclick: function(){
							vnode.attrs.setView(2);
						}
					}, "Tijdlijn"),
				]),

			]);
		}
	};
};
