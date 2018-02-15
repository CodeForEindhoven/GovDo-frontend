var DateWeekSelector = function(){
	var dropdown = false;
	var currentyear;
	var currentweek;

	return {
		view: function(vnode){
			var date = FuzzyDate.toRange(vnode.attrs.date);
			if(date[0]){
				if(!currentyear){currentyear = FuzzyDate.currentYear(date[0]);}
				if(!currentweek){currentweek = FuzzyDate.currentWeek(date[0]);}
			} else {
				currentyear = FuzzyDate.currentYear(new Date());
				currentweek = FuzzyDate.currentWeek(new Date());
			}


			var weeksinyear = FuzzyDate.currentWeek(new Date("12/31/"+currentyear));
			if(weeksinyear===1) { weeksinyear = FuzzyDate.currentWeek(new Date("12/24/"+currentyear));}

			return m("span.dateweek-selector", [
				m("span.dateweek-selector-date", {
					onclick: function(){
						dropdown = !dropdown;
					}
				}, date[1] ? "week "+FuzzyDate.currentWeek(date[1])+" - "+FuzzyDate.currentYear(date[1]) : [
					date[0] ? "week "+FuzzyDate.currentWeek(date[0])+" - "+FuzzyDate.currentYear(date[0]) : "Onbekend"
				]),

				dropdown ? m(".dateweek-selector-dropdown",[
					m(NumberRoller, {
						value: parseInt(currentyear),
						oninput: function(inpt){
							currentyear = inpt;
							m.redraw();
						}
					}),
					m(".dateweek-selector-dropdown-weeks", ArrayFromRange(1,weeksinyear).map(function(week){
						return m(".dateweek-selector-dropdown-week", {
							class: (currentweek === week) ? "state-selected":"",
							onclick: function(){
								currentweek = week;
								dropdown = false;
								vnode.attrs.oninput(FuzzyDate.StringfromDate(FuzzyDate.getDateOfWeek(currentweek, currentyear)));
							}
						}, week);
					}))
				]) : []
			]);
		}
	};
};
