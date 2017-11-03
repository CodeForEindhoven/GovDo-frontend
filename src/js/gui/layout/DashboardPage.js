var DashboardPage = function(){
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
			return [
				m(".layout-optionbar", [

				]),
				m(".layout-workspace", [
					m(".dashboard-statistics", [
						m(".dashboard-query", [
							m("span", "Aantal "),
							m(DropDown, {
								value: count,
								options: ["programma's", "opgaven", "inspanningen", "personen"],
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

					]),
				])
			];
		}
	};
};

/*
m(DashboardDistribution, {
	series: ptrn("person", function(p){
		return p("effort", function(e){
			return e;
		}).length;
	}).reduce(function(o,d){
		if(!o[d]){
			o[d]=0;
		}
		o[d]+=1;
		return o;
	},[]),
	label: "Verdeling van aantal inspanningen over personen",
	labelx: "inspanningen",
	labely: "personen",
}),

m(DashboardDistribution, {
	series: ptrn("person", function(p){
		return p("effort task", function(e){
			return e;
		}).length;
	}).reduce(function(o,d){
		if(!o[d]){
			o[d]=0;
		}
		o[d]+=1;
		return o;
	},[]),
	label: "Verdeling van aantal opgaven over personen",
	labelx: "opgaven",
	labely: "personen",
}),

m(DashboardDistribution, {
	series: ptrn("person", function(p){
		return p("effort task program", function(e){
			return e;
		}).length;
	}).reduce(function(o,d){
		if(!o[d]){
			o[d]=0;
		}
		o[d]+=1;
		return o;
	},[]),
	label: "Verdeling van aantal programma's over personen",
	labelx: "programma's",
	labely: "personen",
}),

m(DashboardDistribution, {
	series: ptrn("task", function(p){
		return p("effort", function(e){
			return e;
		}).length;
	}).reduce(function(o,d){
		if(!o[d]){
			o[d]=0;
		}
		o[d]+=1;
		return o;
	},[]),
	label: "Verdeling van aantal inspanningen over opgaven",
	labelx: "inspanningen",
	labely: "opgaven",
}),

m(DashboardDistribution, {
	series: ptrn("program", function(p){
		return p("task", function(e){
			return e;
		}).length;
	}).reduce(function(o,d){
		if(!o[d]){
			o[d]=0;
		}
		o[d]+=1;
		return o;
	},[]),
	label: "Verdeling van aantal opgaven over programma's",
	labelx: "opgaven",
	labely: "programma's",
}),

m(DashboardDistribution, {
	series: ptrn("program", function(p){
		return p("task effort", function(e){
			return e;
		}).length;
	}).reduce(function(o,d){
		if(!o[d]){
			o[d]=0;
		}
		o[d]+=1;
		return o;
	},[]),
	label: "Verdeling van aantal inspanningen over programma's",
	labelx: "inspanningen",
	labely: "programma's",
}),

m(DashboardDistribution, {
	series: ptrn("program", function(p){
		return p("task effort person", function(e){
			return e;
		}).length;
	}).reduce(function(o,d){
		if(!o[d]){
			o[d]=0;
		}
		o[d]+=1;
		return o;
	},[]),
	label: "Verdeling van aantal mensen over programma's",
	labelx: "mensen",
	labely: "programma's",
}),

*/
