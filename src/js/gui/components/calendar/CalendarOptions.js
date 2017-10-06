var CalendarOptions = function(){
	return {
		view: function(vnode){
			return m(".optionbar.calendar-optionbar",[
				m(".optionbar-option", {
					onclick: function(){
						vnode.attrs.setDate(new Date());
					}
				}, "Deze Week"),
				m(".optionbar-option", {
					onclick: function(){
						vnode.attrs.setScale(1);
					}
				}, "Weeken"),
				m(".optionbar-option", {
					onclick: function(){
						vnode.attrs.setScale(2);
					}
				}, "Maanden")
			]);
		}
	};
};
