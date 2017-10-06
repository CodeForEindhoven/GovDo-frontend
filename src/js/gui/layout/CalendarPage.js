var CalendarPage = function(){
	var scrollTop = 0;
	var currentDate = new Date();
	var currentScale = 1;

	function setDate(date){
		currentDate = date;
	}

	function setScale(s){
		currentScale = s;
	}

	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", m(CalendarOptions, {
					setDate: setDate,
					setScale: setScale
				})),
				m(".layout-workspace", [
					m(".layout-thincolumn",  m(PersonalEfforts, {
						onscroll: function(e){scrollTop = e;}
					})),
					m(".layout-thickcolumn",  m(LinearCalendar, {
						scrollTop: scrollTop,
						currentDate: currentDate,
						currentScale: currentScale,
						setDate: setDate,
					}))
				])
			];
		}
	};
};
