var CalendarOptions = function(){
	return {
		view: function(vnode){
			return m(".optionbar.calendar-optionbar",[
				m(".optionbar-option", {
					onclick: function(){
						vnode.attrs.setDate(new Date());
					}
				}, "Deze Week")
			]);
		}
	};
};
