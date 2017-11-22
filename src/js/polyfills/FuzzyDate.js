var FuzzyDate = {};

FuzzyDate.years = (function(){
	var y = [
		{label:"Geen",value: false, p: false},
		{splitter: true},
		{label:"Doorlopend",value: "~", p: false},
		{splitter: true}
	];
	var d = new Date().getFullYear();
	for(var i=0; i<30; i++){
		y.push({label:d,value: ""+d, p: true});
		d++;
	}
	return y;
})();

FuzzyDate.months  = (function(){
	return [
		{value: false},

		{splitter: true},

		{label: "1e kwartaal", value: "1k", p: false},
		{label: "2e kwartaal", value: "2k", p: false},
		{label: "3e kwartaal", value: "3k", p: false},
		{label: "4e kwartaal", value: "4k", p: false},

		{splitter: true},

		{label: "januari", 	value: "1", p: true},
		{label: "februari", value: "2", p: true},
		{label: "maart", 	value: "3", p: true},
		{label: "april", 	value: "4", p: true},
		{label: "mei", 		value: "5", p: true},
		{label: "juni", 	value: "6", p: true},
		{label: "juli", 	value: "7", p: true},
		{label: "augustus", value: "8", p: true},
		{label: "september",value: "9", p: true},
		{label: "october", 	value: "10", p: true},
		{label: "november", value: "11", p: true},
		{label: "december", value: "12", p: true}
	];
})();

FuzzyDate.days = (function(){
	var d = [
		{value: false},

		{splitter: true},

		{label: "Begin", value: "1k", p: false},
		{label: "Midden", value: "2k", p: false},
		{label: "Eind", value: "3k", p: false},

		{splitter: true},

	];
	for(var i=1; i<32; i++){
		d.push({label: ""+i, value: ""+i, p: true});
	}
	return d;
})();

FuzzyDate.toRange = function(string){
	var date = FuzzyDate.toArray(string);
	var a,b;

	if(!date){return [a,b];}


	if(date[0].p && date[1].p && date[2].p){
		a = new Date(string);

	} else if(date[0].p && date[1].p) {
		var y = date[0].value;
		var m = date[1].value;
		if(date[2].value){
			if(date[2].value==="1k"){
				a = new Date(y+"/"+m+"/1");
				b = new Date(y+"/"+m+"/10");
			} else if(date[2].value==="2k"){
				a = new Date(y+"/"+m+"/10");
				b = new Date(y+"/"+m+"/20");
			}  else if(date[2].value==="3k"){
				a = new Date(y+"/"+m+"/20");
				b = new Date(y+"/"+m+"/30");
			}
		} else {
			a = new Date(y+"/"+m+"/1");
			b = new Date(y+"/"+m+"/30");
		}

	} else if(date[0].p){
		var y = date[0].value;
		if(date[1].value){
			if(date[1].value==="1k"){
				a = new Date(y+"/1/1");
				b = new Date(y+"/3/30");
			} else if(date[1].value==="2k"){
				a = new Date(y+"/4/1");
				b = new Date(y+"/6/30");
			}  else if(date[1].value==="3k"){
				a = new Date(y+"/7/1");
				b = new Date(y+"/9/30");
			} else if(date[1].value==="4k"){
				a = new Date(y+"/10/1");
				b = new Date(y+"/12/30");
			}
		} else {
			a = new Date(y+"/1/1");
			b = new Date(y+"/12/30");
		}
	} else if(date[0].value === "~") {
		a = new Date(-8640000000000000);
		b = new Date(8640000000000000);
	}

	return [a,b];
};

FuzzyDate.toArray = function(string){
	var date = [];
	var d = string.split("/");
	date[0] = FuzzyDate.years.find(function(e){
		return (!e.splitter) && (e.value === d[0]);
	});
	date[1] = FuzzyDate.months.find(function(e){
		return (!e.splitter) && (e.value === d[1]);
	});
	date[2] = FuzzyDate.days.find(function(e){
		return (!e.splitter) && (e.value === d[2]);
	});

	if(d[0]==="_") {
		date[0] = FuzzyDate.years[0];
	} else if(d[0]==="~") {
		date[0] = FuzzyDate.years[2];
	} else {
		date[0] = {value: d[0], label: d[0], p: true};
	}

	date[1] = date[1] || {value: false};
	date[2] = date[2] || {value: false};

	return date;
};

FuzzyDate.toString = function(date){
	var y = date[0].value || "_";
	var m = date[1].value || "_";
	var d = date[2].value || "_";
	return (y+"/"+m+"/"+d);
};

FuzzyDate.StringfromDate = function(date){
	return (date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate());
};

FuzzyDate.toReadableString = function(string){
	var date = FuzzyDate.toArray(string);
	var readable = "";
	if(date[2].value){
		readable = date[2].label + " ";
	}
	if(date[1].value){
		readable = readable + date[1].label + " ";
	}
	if(date[0].value){
		readable = readable + date[0].label + " ";
	} else {
		readable = "Onbekend";
	}
	return readable;
};

FuzzyDate.inRange = function(start, end, input){
	var rangeA = FuzzyDate.toRange(start);
	var rangeB = FuzzyDate.toRange(end);

	var startDate = rangeA[0];
	var endDate = rangeB[1] ? rangeB[1] : rangeB[0];

	return (input > startDate && input < endDate);
};

FuzzyDate.currentWeek = function(date){
	date = new Date(date.getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	// January 4 is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

FuzzyDate.currentYear = function(date){
	date = new Date(date.getTime());
	date.setHours(0, 0, 0, 0);
	return date.getFullYear();
};

FuzzyDate.nextWeek = function(date){
	var d = new Date(date);
	var nextweek = new Date(d.getFullYear(), d.getMonth(), d.getDate()+7);
	return nextweek;
};

FuzzyDate.prevWeek = function(date){
	var d = new Date(date);
	var nextweek = new Date(d.getFullYear(), d.getMonth(), d.getDate()-7);
	return nextweek;
};

FuzzyDate.nextMonth = function(date){
	var d = new Date(date);
	var nextweek = new Date(d.getFullYear(), d.getMonth()+1, d.getDate());
	return nextweek;
};

FuzzyDate.prevMonth = function(date){
	var d = new Date(date);
	var nextweek = new Date(d.getFullYear(), d.getMonth()-1, d.getDate());
	return nextweek;
};

FuzzyDate.prevKwarter = function(date){
	var d = new Date(date);
	var nextweek = new Date(d.getFullYear(), d.getMonth(), d.getDate()-7*12);
	return nextweek;
};

FuzzyDate.nextKwarter = function(date){
	var d = new Date(date);
	var nextweek = new Date(d.getFullYear(), d.getMonth(), d.getDate()+7*12);
	return nextweek;
};

FuzzyDate.nextYear = function(date){
	var d = new Date(date);
	var nextweek = new Date(d.getFullYear()+1, d.getMonth(), d.getDate());
	return nextweek;
};

FuzzyDate.getMonday = function(date){
	var d = new Date(date);
	var day = d.getDay();
	var diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
	var r = new Date(d.setDate(diff));
	return new Date(r.getFullYear(), r.getMonth(), r.getDate());
};

FuzzyDate.getFirstDayOfMonth = function(date){
	var d = new Date(date);
	return new Date(d.getFullYear(), d.getMonth(), 1);
};

FuzzyDate.getDateOfWeek = function(w, y) {
	var simple = new Date(y, 0, 1 + (w - 1) * 7);
	var dow = simple.getDay();
	var ISOweekStart = simple;
	if (dow <= 4)
		ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
	else
		ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
	return ISOweekStart;
};
