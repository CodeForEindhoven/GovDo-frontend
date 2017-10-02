var DatePicker = function(){
	var date = [{value: false},{value: false},{value: false}];
	var state = false;

	function finish(){
		state = false;
	}

	function update(vnode){
		vnode.attrs.onchange(FuzzyDate.toString(date));
	}

	function parseValue(input){
		date = FuzzyDate.toArray(input);
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
					m(".datepicker-navigation",[
						m(".datepicker-section.editor-small-label", "Jaar"),
						m(".datepicker-section.editor-small-label", "Maand/Kwartaal"),
						m(".datepicker-section.editor-small-label", "Dag/Periode"),
					]),
					m(".datepicker-date",[
						m(".datepicker-section", getLabel(date[0])),
						m(".datepicker-section", getLabel(date[1])),
						m(".datepicker-section", getLabel(date[2])),
					])
				]),
				state ? m(".datepicker-menu",[
					m(".datepicker-column", [
						FuzzyDate.years.map(function(e){
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
					m(".datepicker-column", {
						class: (date[0].p) ? "active" : "disabled",
					},[
						FuzzyDate.months.map(function(e){
							if(!e.splitter) return m(".datepicker-option", {
								class: (date[1].value===e.value) ? "state-selected":"",
								onclick: function(){
									if(date[0].p){
										date[1] = e;
										date[2] = {value: false};
										update(vnode);
										if(!e.p) {
											finish();
										}
									}
								}
							},getLabel(e));
							return m(".datepicker-splitter","");
						})
					]),
					m(".datepicker-column", {
						class: (date[1].p) ? "active": "disabled",
					}, [
						FuzzyDate.days.map(function(e){
							if(!e.splitter) return m(".datepicker-option", {
								class: (date[2].value===e.value) ? "state-selected":"",
								onclick: function(){
									if(date[1].p){
										date[2] = e;
										update(vnode);
										finish();
									}
								}
							},getLabel(e));
							return m(".datepicker-splitter","");
						})
					])
				]) : []
			]);
		}
	};
};
