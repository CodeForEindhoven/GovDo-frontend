var CalendarPage = function(){
	var scrollTop = 0;
	var currentDate = new Date();
	function setDate(date){
		currentDate = date;
	}

	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", m(CalendarOptions, {
					setDate: setDate
				})),
				m(".layout-workspace", [
					m(".layout-thincolumn",  m(PersonalEfforts, {
						onscroll: function(e){scrollTop = e;}
					})),
					m(".layout-thickcolumn",  m(LinearCalendar, {
						scrollTop: scrollTop,
						currentDate: currentDate,
						setDate: setDate
					}))
				])
			];
		}
	};
};
