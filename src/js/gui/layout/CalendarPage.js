var CalendarPage = function(){
	var scrollTop = 0;
	var currentDate = FuzzyDate.prevMonth(new Date());
	var currentScale = 1;
	var currentView = 1;

	function setDate(date){
		if(date !== undefined){
			currentDate = date;
		}
	}

	function setScale(s){
		currentScale = s;
	}

	function setView(s){
		currentView = s;
	}



	return {
		view: function(vnode){
			return (vm.focus()) ? [
				m(".layout-optionbar", m(CalendarOptions, {
					currentScale: currentScale,
					currentView: currentView,
					setDate: setDate,
					setScale: setScale,
					setView: setView,
				})),
				m(".layout-workspace", [
					m(".layout-thincolumn",  m(PersonalEfforts, {
						onscroll: function(e){scrollTop = e;},
						setDate: setDate,
						currentView: currentView
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
			] : [];
		}
	};
};
