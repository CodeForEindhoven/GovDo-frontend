var DashboardPage = function(){
	var queryA = "task effort person";
	var queryB = "effort";
	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", "Aantal inspanningen per persoon"),
				m(".layout-workspace", [
					m(".dashboard-statistics", [
						m(".dashboard-query", ""),
						m(DashboardHistogram, {
							series: ptrn(queryA, function(p){return [p.value(), p(queryB, function(e){return e;}).length];}).sort(function(a,b){return b[1]-a[1];}),
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
