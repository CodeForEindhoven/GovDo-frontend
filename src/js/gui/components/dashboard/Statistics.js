var Statistics = function(){
	var count = 1;
	var list = 0;

	var query = [
		{
			list: "program",
			count: ["program", "task", "task effort", "task effort person"],
		},
		{
			list: "task",
			count: ["program", "task", "effort", "effort person"],
		},
		{
			list: "effort",
			count: ["task program", "task", "effort", "person"],
		},
		{
			list: "person",
			count: ["effort task program", "effort task", "effort", "person"],
		}
	];
	
	return {
		view: function(vnode){
			return m(".dashboard-statistics", [
				m(".dashboard-query", [
					m("span", "Aantal "),
					m(DropDown, {
						value: count,
						options: ["programma's", "opgaven", "inspanningen", "mensen"],
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
					series: ptrn(query[list].list, function(p){return [p.value(), p(query[list].count[count], function(e){return e;}).length];}).sort(function(a,b){return b[1]-a[1];}),
					label: "Aantal personen per programma",
				}),
			]);
		}
	};
};
