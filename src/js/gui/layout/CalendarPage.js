var CalendarPage = function(){
	var scrollTop = 0;
	var currentDate = new Date();
	var currentScale = 1;
	var currentView = 2;

	function setDate(date){
		currentDate = date;
	}

	function setScale(s){
		currentScale = s;
	}

	function setView(s){
		currentView = s;
	}

	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", m(CalendarOptions, {
					currentScale: currentScale,
					currentView: currentView,
					setDate: setDate,
					setScale: setScale,
					setView: setView,
				})),
				m(".layout-workspace", [
					m(".layout-thincolumn",  m(PersonalEfforts, {
						onscroll: function(e){scrollTop = e;}
					})),

					m(".layout-thickcolumn", [
						(currentView === 1) ?
							m(HoursCalendar, {
								scrollTop: scrollTop,
								currentDate: currentDate,
								currentScale: currentScale,
								setDate: setDate,
							})
						:
							m(LinearCalendar, {
								scrollTop: scrollTop,
								currentDate: currentDate,
								currentScale: currentScale,
								setDate: setDate,
							})
					])
				])
			];
		}
	};
};
