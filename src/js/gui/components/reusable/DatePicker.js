var DatePicker = function(){
	var date = [{value: false},{value: false},{value: false}];
	var state = false;

	function years(){
		var y = [{label:"Geen",value: false, p: false}, {splitter: true}];
		var d = new Date().getFullYear();
		for(var i=0; i<10; i++){
			y.push({label:d,value: ""+d, p: true});
			d++;
		}
		return y.concat([{splitter: true},{label:"+10 jaar",value: "future", p: false}]);
	}

	function months(){
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
	}

	function days(){
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
	}

	function finish(){
		state = false;
	}

	function update(vnode){
		var y = date[0].value || "_";
		var m = date[1].value || "_";
		var d = date[2].value || "_";
		vnode.attrs.onchange(y+"/"+m+"/"+d);
	}

	function parseValue(input){
		var d = input.split("/");
		date[0] = years().find(function(e){
			return (!e.splitter) && (e.value === d[0]);
		});
		date[1] = months().find(function(e){
			return (!e.splitter) && (e.value === d[1]);
		});
		date[2] = days().find(function(e){
			return (!e.splitter) && (e.value === d[2]);
		});

		date[0] = date[0] || {value: false};
		date[1] = date[1] || {value: false};
		date[2] = date[2] || {value: false};
	}

	function getLabel(e){
		if(e.value===false){
			return "Geen";
		}
		return e.label;
	}

	return {
		view: function(vnode){
			parseValue(vnode.attrs.value);
			return m(".datepicker",[
				m(".datepicker-value", {
					onclick: function(){state=!state;}
				},[
					m("",[
						m(".datepicker-section.editor-small-label", "Jaar"),
						m(".datepicker-section.editor-small-label", "Maand/Kwartaal"),
						m(".datepicker-section.editor-small-label", "Dag/Periode"),
					]),
					m("",[
						m(".datepicker-section", getLabel(date[0])),
						m(".datepicker-section", getLabel(date[1])),
						m(".datepicker-section", getLabel(date[2])),
					])
				]),
				state ? m(".datepicker-menu",[
					m(".datepicker-column", [
						years().map(function(e){
							if(!e.splitter) return m(".datepicker-option", {
								class: (date[0].value===e.value) ? "state-selected":"",
								onclick: function(){
									date[0] = e;
									date[1] = {value: false};
									date[2] = {value: false};
									update(vnode);
									if(!e.p) {
										finish();
									}
								}
							},getLabel(e));
							return m(".datepicker-splitter","");
						})
					]),
					(date[0].p) ? m(".datepicker-column", [
						months().map(function(e){
							if(!e.splitter) return m(".datepicker-option", {
								class: (date[1].value===e.value) ? "state-selected":"",
								onclick: function(){
									date[1] = e;
									date[2] = {value: false};
									update(vnode);
									if(!e.p) {
										finish();
									}
								}
							},getLabel(e));
							return m(".datepicker-splitter","");
						})
					]) : [],
					(date[1].p) ? m(".datepicker-column", [
						days().map(function(e){
							if(!e.splitter) return m(".datepicker-option", {
								class: (date[2].value===e.value) ? "state-selected":"",
								onclick: function(){
									date[2] = e;
									update(vnode);
									finish();
								}
							},getLabel(e));
							return m(".datepicker-splitter","");
						})
					]) : []
				]) : []
			]);
		}
	};
};

var DropdownMenu = function(){
	var state = false;
	return {
		view: function(vnode){
			return m(".dropdown", [
				m("span.dropdown-value", {
					class: (vnode.attrs.value !== undefined) ? "" : "novalue",
					onclick: function(){
						state = !state;
					}
				}, (vnode.attrs.value !== undefined) ? vnode.attrs.options[vnode.attrs.value] : vnode.attrs.novalue),
				state ? m("div.dropdown-options",[
					vnode.attrs.options.map(function(option, count){
						return m(".dropdown-option", {
							onclick: function(){
								state = false;
								vnode.attrs.onchange(count);
							}
						}, option);
					})
				]) : []
			]);
		}
	};
};
