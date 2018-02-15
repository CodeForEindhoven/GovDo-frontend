var DashboardPage = function(){
	var currentPage = 0;

	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", [
					m(".optionbar", [
						m(".optionbar-section", [
							m(".sub-navigation-label", "Visualizatie"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 0;},
								class: (currentPage===0)? "state-selected":""
							}, "Statistieken"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 1;},
								class: (currentPage===1)? "state-selected":""
							}, "Voortgang"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 2;},
								class: (currentPage===2)? "state-selected":""
							}, "Overzicht"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 3;},
								class: (currentPage===3)? "state-selected":""
							}, "Sleutel Woorden"),
						]),
					])
				]),
				m(".layout-workspace", [
					(currentPage===0) ? m(Statistics) : [],
					(currentPage===1) ? m(FeedbackResults) : [],
					(currentPage===2) ? m(GeneralStatus) : [],
					(currentPage===3) ? m(KeywordOverview) : []
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
