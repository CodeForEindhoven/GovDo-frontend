var PeopleListEditor = function(){
	var state = false;
	var value = "";

	return {
		view: function(vnode){
			return m(".editor-peoplelist", {
					class: vnode.attrs.classname+" "+(vnode.attrs.state ? "":"state-hidden")
				}, [
					vnode.attrs.state ? [
						m("input.input.editor-peoplelist-searchbar", {
							class: vnode.attrs.state ? "":"state-hidden",
							oncreate: function(vnode){
								vnode.dom.focus();
							},
							placeholder: "Voornaam Achternaam",
							oninput: m.withAttr("value", function(v) {value = v;}),
							onchange: m.withAttr("value", function(v) {value = v;}),
							value: value,
						}),
						m("i.material-icons.editor-peoplelist-searchbar-icon", "search"),
						m(".editor-peoplelist-finder.box-editor-style", [
							(value.length > 0)?
								m(FilteredPeopleList, {
									value: value,
									allownew: true,
									onadd: function(p){
										value = "";
										vnode.attrs.onadd(p);
									},
									//onnew: function(){onnew(vnode);}
								})
							:
								m(TeamList, {
									onadd: function(p){vnode.attrs.onadd(p);}
								})
						]),
					] : [],

					(vnode.attrs.peoplelist.length > 0 ) ? m(".editor-peoplelist-navigation",[
						//m(".editor-peoplelist-section.sub-navigation-label", "Jaar"),
						(vnode.attrs.planhours) ? m(".editor-peoplelist-section.sub-navigation-label", "Uur per week") : [],
						(!vnode.attrs.noroles) ? m(".editor-peoplelist-section.sub-navigation-label", "Positie") : [],
					]) : [],

					vnode.attrs.peoplelist.map(function(person){
						var plannedhours = person("hours",function(h){return h;}).filter(function(h){return h("#"+vm.edit().id()).id()>-1;});
						var parsedhours;
						if(plannedhours[0]){
							parsedhours = HoursSpent.Parse(plannedhours[0].value());
						} else {
							parsedhours = undefined;
						}

						return m(".editor-peoplelist-person", [

							//name
							m("span.editor-peoplelist-person-name.body-text", person.value()),

							//hours
							(vnode.attrs.planhours) ? [
								m(".editor-hours-week", [
									m(NumberRoller, {
										value: (parsedhours) ? parseInt(parsedhours.hours) : "~",
										oninput: function(value){
											parsedhours.hours = ""+value;
											plannedhours[0].update(HoursSpent.toString(parsedhours));
											m.redraw();
										}
									}),
								]),
								m(".switch-frequency", {
									onclick: function(){
										if(parsedhours.period.length[0]==="~"){
											parsedhours.period.length[0] = "1";
											parsedhours.period.every[0] = "2";
										} else {
											parsedhours.period.length[0] = "~";
										}

										plannedhours[0].update(HoursSpent.toString(parsedhours));
											console.log(plannedhours[0].value());
										m.redraw();
									}
								}, (parsedhours && parsedhours.period.length[0]==="~") ? "Doorlopend" : "Piek belasting"),

								/*(parsedhours && parsedhours.period.length[0]!=="~") ? m(".editor-peoplelist-person-hours", [
									m(NumberRoller, {
										value: (parsedhours) ? parseInt(parsedhours.period.length[0]) : "~",
										oninput: function(value){
											parsedhours.period.length[0] = ""+value;
											plannedhours[0].update(HoursSpent.toString(parsedhours));
											m.redraw();
										}
									}),
									m(DropDown, {
										value: (parsedhours.period.length[1] === "w") ? -1 : 0,
										options: ["maanden"],
										novalue: ["weken"],
										onchange: function(e){
											if(e===0){
												parsedhours.period.length[1] = "m";
											} else {
												parsedhours.period.length[1] = "w";
											}
											plannedhours[0].update(HoursSpent.toString(parsedhours));
										}
									}),
									m("span", " iedere "),
									m(NumberRoller, {
										value: (parsedhours) ? parseInt(parsedhours.period.every[0]) : "~",
										oninput: function(value){
											parsedhours.period.every[0] = ""+value;
											plannedhours[0].update(HoursSpent.toString(parsedhours));
											m.redraw();
										}
									}),
									m(DropDown, {
										value: (parsedhours.period.every[1] === "w") ? -1 : 0,
										options: ["maanden"],
										novalue: ["weken"],
										onchange: function(e){
											if(e===0){
												parsedhours.period.every[1] = "m";
											} else {
												parsedhours.period.every[1] = "w";
											}
											plannedhours[0].update(HoursSpent.toString(parsedhours));
										}
									}),
								]) : []*/
							] : [],

							//roles
							(!vnode.attrs.noroles) ? m(DropDown, {
								value: vnode.attrs.roles.selected(person),
								options: vnode.attrs.roles.options,
								novalue: vnode.attrs.roles.novalue,
								onchange: function(e){
									vnode.attrs.roles.onchange(e, person);
								}
							}) : [],

							m("span.icon-button.editor-peoplelist-person-remove", [
								m("i.material-icons", {
									onclick: function(){vnode.attrs.ondelete(person);}
								},"close"),
								m("span.icon-button-hint", "Verwijderen")
							])

						]);
					}).emptyState(!vnode.attrs.state ? m(".editor-empty-list",m(".button.button-empty-list", {
						onclick: vnode.attrs.onopen
					},vnode.attrs.emptystate)):[]),

					((vnode.attrs.peoplelist.length > 0 ) && vnode.attrs.planhours) ?
						m(".total-hours", [
						m(".title-total", "Totaal uur"),
						m(".total-hours-counting", vnode.attrs.peoplelist.reduce(function(total, person){
							var plannedhours = person("hours",function(h){return h;}).filter(function(h){return h("#"+vm.edit().id()).id()>-1;});
							if(plannedhours[0]){
								var parsedhours = HoursSpent.Parse(plannedhours[0].value());
								return total + parseInt(parsedhours.hours);
							} else {
								return total;
							}
						}, 0))
					]) : []
			]);
		}
	};
};
