var FuzzyDate = {};

FuzzyDate.years = (function(){
	var y = [{label:"Geen",value: false, p: false}, {splitter: true}];
	var d = new Date().getFullYear();
	for(var i=0; i<10; i++){
		y.push({label:d,value: ""+d, p: true});
		d++;
	}
	return y.concat([{splitter: true},{label:"na "+(d+1),value: "future", p: false}]);
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
	];
	for(var i=1; i<32; i++){
		d.push({label: ""+i, value: ""+i, p: true});
	}
	return d;
})();

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
		date[0] = {value: false};
	} else {
		date[0] = {value: d[0], label: d[0]};
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
