var CalendarPage = function(){
	var scrollTop = 0;

	return {
		view: function(vnode){
			return m(".layout-workspace", [
				m(".layout-thincolumn",  m(PersonalEfforts, {onscroll: function(e){scrollTop = e;}})),
				m(".layout-thickcolumn",  m(LinearCalendar, {scrollTop: scrollTop}))
			]);
		}
	};
};
