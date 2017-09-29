var DatePicker = function(){
	var date = [{value: false},{value: false},{value: false}];
	var state = false;

	function years(){
		var y = [{label:"Geen",value: false, p: false}, {splitter: true}];
		var d = new Date().getFullYear();
		for(var i=0; i<10; i++){
			y.push({label:d,value: d, p: true});
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

			{label: "januari", 	value: 1, p: true},
			{label: "februari", value: 2, p: true},
			{label: "maart", 	value: 3, p: true},
			{label: "april", 	value: 4, p: true},
			{label: "mei", 		value: 5, p: true},
			{label: "juni", 	value: 6, p: true},
			{label: "juli", 	value: 7, p: true},
			{label: "augustus", value: 8, p: true},
			{label: "september",value: 9, p: true},
			{label: "october", 	value: 10, p: true},
			{label: "november", value: 11, p: true},
			{label: "december", value: 12, p: true}
		];
	}

	function days(){
		var d = [
			{value: false},

			{splitter: true},

			{label: "Begin", value: "1k", p: false},
			{label: "Midden", value: "2k", p: false},
			{label: "Eind", value: "3k", p: false},
		];;
		for(var i=1; i<31; i++){
			d.push({label: i, value: i, p: true});
		}
		return d;
	}

	return {
		view: function(vnode){
			return m(".datepicker",[
				m(".datepicker-value", {
					onclick: function(){state=!state;}
				},[
					m(".datepicker-section", date[0]),
					m(".datepicker-section", date[1]),
					m(".datepicker-section", date[2])
				]),
				state ? m(".datepicker-menu",[
					m(".datepicker-column", [
						years().map(function(e){
							if(e) return m(".datepicker-option", {
								onclick: function(){
									date[0] = e;
									if(e === "Geen" || "10+ jaar") {
										state = false;
										date[1] = "Geen";
										date[2] = "Geen";
									}
								}
							},e);
							return m(".datepicker-splitter","");
						})
					]),
					(date[0]!== "Geen") ? m(".datepicker-column", [
						months().map(function(e){
							if(e) return m(".datepicker-option", {
								onclick: function(){
									date[1] = e;
									if(e === "Geen") {
										state = false;
										date[2] = "Geen";
									}
								}
							},e);
							return m(".datepicker-splitter","");
						})
					]) : [],
					(date[1]!=="Geen") ? m(".datepicker-column", [
						days().map(function(e){
							if(e) return m(".datepicker-option", {
								onclick: function(){
									date[2] = e;
									if(e === "Geen") {state = false;}
								}
							},e);
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
