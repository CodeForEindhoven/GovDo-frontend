var DatePicker = function(){
	var date = [undefined,undefined,undefined];

	return {
		view: function(vnode){
			return m(".datepicker",[
				m(DropdownMenu,{
					value: date[2],
					options: ["Begin", "Medio", "Eind"],
					novalue: "periode",
					onchange: function(v){
						date[2] = v;
						//viewModels.editMode.setContent("end_month", v);
					}
				}),
				m("span.editor-selection-date-dash","-"),
				m(DropdownMenu,{
					value: date[1],
					options: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"],
					novalue: "maand",
					onchange: function(v){
						date[1] = v;
						//viewModels.editMode.setContent("end_month", v);
					}
				}),
				m("span.editor-selection-date-dash","-"),
				m(DropdownMenu,{
					value: date[0],
					options: ["2017", "2018", "2019", "2020", "2021", "2022"],
					novalue: "jaar",
					onchange: function(v){
						date[0] = v;
						//viewModels.editMode.setContent("end_year", v);
					}
				})
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
