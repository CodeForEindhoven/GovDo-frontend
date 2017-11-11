var HoursSpent = {};

HoursSpent.Parse = function(string){
	var s = string.split("-");

	return {
		start: s[0],
		end: s[1],
		hours: s[2],
		period: (s.length === 7) ? {
			length: [s[3],s[4]],
			every: [s[5],s[6]]
		} : false
	};
};

HoursSpent.toString = function(o){
	return FuzzyDate.toString(o.start)+"-"+FuzzyDate.toString(o.end)+"-"+o.hours + (o.period ? ("-"+o.period.length[0]+"-"+o.period.length[1]+"-"+o.period.every[0]+"-"+o.period.every[1]) : "");
};
