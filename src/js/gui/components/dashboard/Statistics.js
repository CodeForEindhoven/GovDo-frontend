var Statistics = function(){
	var count = 1;
	var list = 0;

	var query = [
		{
			list: "program",
			count: ["program", "task", "task effort", "task effort person", "task effort person hours"],
		},
		{
			list: "task",
			count: ["program", "task", "effort", "effort person", "effort person hours"],
		},
		{
			list: "effort",
			count: ["task program", "task", "effort", "person", "hours"],
		},
		{
			list: "person",
			count: ["effort task program", "effort task", "effort", "person", "hours"],
		}
	];

	return {
		view: function(vnode){
			return m(".dashboard-statistics", [
				m(".dashboard-query", [
					m("span", "Aantal "),
					m(DropDown, {
						value: count,
						options: ["programma's", "opgaven", "inspanningen", "mensen", "uren"],
						onchange: function(v){
							count = v;
						}
					}),
					m("span", " per "),
					m(DropDown, {
						value: list,
						options: ["programma", "opgave", "inspanning", "persoon"],
						onchange: function(v){
							list = v;
						}
					}),
				]),
				m(DashboardHistogram, {
					series: ptrn(query[list].list, function(p){
						if(count === 4) { // if it's hours reduce in a different way
							return [p.value(), p(query[list].count[count], function(e){
								return e;
							}).filter(function(e){
								var effort = e("effort");
								var person = e("person");
								if(effort.id() > -1 && person.id() > -1){
									var monday = FuzzyDate.getMonday(new Date());
									return FuzzyDate.inRange(effort("startdate").value(), effort("enddate").value(), monday);
								}
								return false;
							}).map(function(e){
								return parseInt(HoursSpent.Parse(e.value()).hours);
							}).reduce(function(a,b){
								return a+b;
							},0)];
						} else {
							return [p.value(), p(query[list].count[count], function(e){return e;}).length];
						}
					}).sort(function(a,b){
						return b[1]-a[1];
					}),
				}),
			]);
		}
	};
};
