var EffortEditor = function(){
	var stateTeam = false;
	var stateClient = false;
	var state2 = false;
	return {
		view: function(vnode){
			return m(".efforteditor",[

				m(".editor-section",[
					m(".editor-section-title.title", "Beschrijving"),

					m(".editor-row",[
						m(".editor-column",[
							m(".editor-subtitle.subtitle", [
								m("span", "Inspanning titel"),
								m(InfoBox, {
									content: "Kies een korte en herkenbare titel"
								})
							]),
							m(TextArea, {
								value: vm.edit().value(),
								onchange: function(v){
									vm.edit().update(v);
									//viewModels.editMode.setContent("name", v);
								}
							}),
						]),

						m(".editor-column",[
							m(".editor-subtitle.subtitle", [
								m("span", "Type"),
								m(InfoBox, {
									content: m("ul", [
										m("li","Een routine is een activiteit die zich perodiek herhaalt."),
										m("li", "Een project heeft een begin en einde.")
									])
								})
							]),


							m(TypeEditor, {
								type: parseInt(vm.edit()("type").value()),
								onchange: function(v){
									vm.edit()("type").update(v);
									//viewModels.editMode.setContent("type", v);
								},
							}),
						]),
					]),

					m(".editor-row",[
						m(".editor-column",[
							m(".editor-subtitle.subtitle", [
								m("span", "Beoogd Effect"),
								m(InfoBox, {
									content: m("",[
										m("span", "Datgene wat uiteindelijk bereikt wordt, bijvoorbeeld:"),
										m("ul", [
											m("li","vermindering armoede"),
											m("li", "...")
										])
									])
								})
							]),

							m(TextArea, {
								value: vm.edit()("description").value(),
								onchange: function(v){
									vm.edit()("description").update(v);
								},
							}),
						]),

						m(".editor-column",[
							m(".editor-subtitle.subtitle", [
								m("span", "Eindproduct"),
								m(InfoBox, {
									content: m("",[
										m("span", "Datgene wat uiteindelijk wordt opgeleverd, bijvoorbeeld:"),
										m("ul", [
											m("li","Een rapport"),
											m("li", "...")
										])
									])
								})
							]),

							m(TextArea, {
								value: vm.edit()("endproduct").value(),
								onchange: function(v){
									vm.edit()("endproduct").update(v);
								},
							}),
						]),
					]),
				]),

				m(".editor-section",[
					m(".editor-section-title.title", "Positionering"),

					m(".editor-subtitle-header",[
						m(".editor-subtitle.subtitle", [
							m("span", "Gedeelde Opgaven"),
							m(InfoBox, {
								content: m("",[
									m("span", "Sommige inspanningen worden gedeeld door meerdere programma's"),
								])
							})
						]),

						m(".icons-header", [
							m("i.material-icons", {
								onclick: function(e){
									state2 = !state2;
								}
							},"add")
						]),
					]),
					m(ConnectionEditor, {
						state: state2,
						onchange: function(){
							state2 = false;
						}
					}),
				]),

				//Planning
				m(".editor-section",[
					m(".editor-section-title.title", "Planning"),
					m(".editor-subtitle.subtitle", [
						m("span", "Periode"),
						m(InfoBox, {
							content: m("",[
								m("span", "Als er geen precieze datum bekend is, geef dan alleen een schatting"),
							])
						})
					]),

					m(".editor-selection-date",[
						m("span.body-text", "van"),
						m(DatePicker,{
							value: vm.edit()("startdate").value(),
							onchange: function(e){
								console.log("update: "+e);
								vm.edit()("startdate").update(e);
							}
						})
					]),

					m(".editor-selection-date",[
						m("span.body-text", "t/m"),
						m(DatePicker,{
							value: vm.edit()("enddate").value(),
							onchange: function(e){
								console.log("update: "+e);
								vm.edit()("enddate").update(e);
							}
						})
					]),

					m(".editor-section-totals", FuzzyDate.toWeekRange(vm.edit()("startdate").value(),vm.edit()("enddate").value())[0]),
					m(".editor-section-totals", FuzzyDate.toWeekRange(vm.edit()("startdate").value(),vm.edit()("enddate").value())[1])
				]),


				//Mensen
				m(".editor-section",[
					m(".editor-section-title.title", "Mensen"),

					//Opdrachtgevers
					m(".editor-subtitle-header",[
							m(".editor-subtitle.subtitle", [
								m("span", "Opdrachtgevers"),
								m(InfoBox, {
									content: m("",[
										m("span", "Bestuurlijk en Ambtelijk Opdrachtgevers"),
									])
								})
							]),

						m(".icons-header", [
							m("i.material-icons", {
								onclick: function(e){
									stateClient = !stateClient;
								}
							},"add")
						]),
					]),

					m(PeopleListEditor, {
						peoplelist: vm.edit()("role:aclient person", function(a){return a;}).concat(vm.edit()("role:bclient person", function(a){return a;})),
						roles: {
							selected: function(person){
								return (person("role:bclient #"+vm.edit().id()).id()>0) ? 0 : -1;
							},
							options:["Bestuurlijk Opdrachtgever"],
							novalue: "Ambtelijk Opdrachtgever",
							onchange: function(e, p){
								if(e===0){
									ptrn.speculativeUnrelate(vm.edit(), p("role:aclient"));
									ptrn.speculativeRelate(vm.edit(), p("role:bclient"));
								} else {
									ptrn.speculativeUnrelate(vm.edit(), p("role:bclient"));
									ptrn.speculativeRelate(vm.edit(), p("role:aclient"));
								}
							},
						},
						onadd: function(p){
							ptrn.speculativeRelate(vm.edit(), p("role:aclient"));
							stateClient = false;
						},
						ondelete: function(p){
							if((p("role:aclient #"+vm.edit().id()).id()>0)){
								ptrn.speculativeUnrelate(vm.edit(), p("role:aclient"));
							} else {
								ptrn.speculativeUnrelate(vm.edit(), p("role:bclient"));
							}
						},
						state: stateClient
					}),


					//Team
					m(".editor-subtitle-header",[
							m(".editor-subtitle.subtitle", [
								m("span", "Team"),
								m(InfoBox, {
									content: m("",[
										m("span", "Alle mensen die meewerken aan deze inspanning. Een persoon is de trekker."),
									])
								})
							]),

						m(".icons-header", [
							m("i.material-icons", {
								onclick: function(e){
									stateTeam = !stateTeam;
								}
							},"add")
						]),
					]),

					m(PeopleListEditor, {
						state: stateTeam,
						peoplelist: vm.edit()("person", function(a){return a;}),
						roles: {
							selected: function(person){
								return (person("role:leader #"+vm.edit().id()).id()>0) ? 0 : -1;
							},
							options:["Trekker"],
							novalue: "Teamlid",
							onchange: function(e, p){
								if(e===0){
									ptrn.speculativeRelate(vm.edit(), p("role:leader"));
								} else {
									ptrn.speculativeUnrelate(vm.edit(), p("role:leader"));
								}
							},
						},
						onadd: function(v){
							ptrn.speculativeRelate(vm.edit(), v);
							ptrn.create("hours", "~/_/_-~/_/_-0-~-w-0-w", function(newhours){
								ptrn.speculativeRelate(newhours, vm.edit());
								ptrn.speculativeRelate(newhours, v);
							});
							stateTeam = false;
						},
						ondelete: function(v){
							ptrn.speculativeUnrelate(vm.edit(), v);
						},

						planhours: true,
					}),
				]),

				//Acceptance Process
				m(".editor-section.editor-section-end",[
					m(".status-content",[
						m(Toggle, {
							value: parseInt(vm.edit()("mode").value()),
							label_sketch: "Concept",
							label_submitted: "Voorleggen",
							label_definitive: "Goedgekeurd",
							onchange: function(v){
								vm.edit()("mode").update(v);
							}
						}),
					]),
				]),


			]);
		}
	};
};

var PeopleListEditor = function(){
	var state = false;
	var value = "";

	return {
		view: function(vnode){
			return m(".editor-peoplelist", {
					class: vnode.attrs.state ? "":"state-hidden"
				}, [
					m("input.input.editor-peoplelist-searchbar", {
						class: vnode.attrs.state ? "":"state-hidden",
						placeholder: "Voornaam Achternaam",
						oninput: m.withAttr("value", function(v) {value = v;}),
						onchange: m.withAttr("value", function(v) {value = v;}),
						value: value
					}),
					m(".editor-peoplelist-finder.box-editor-style", [
						(value.length > 0)?
							m(FilteredPeopleList, {
								value: value,
								allownew: true,
								onadd: function(p){vnode.attrs.onadd(p);},
								//onnew: function(){onnew(vnode);}
							})
						:
							m(TeamList, {
								onadd: function(p){vnode.attrs.onadd(p);}
							})
					]),


					m(".editor-peoplelist-navigation",[
						//m(".editor-peoplelist-section.sub-navigation-label", "Jaar"),
						(vnode.attrs.planhours) ? m(".editor-peoplelist-section.sub-navigation-label", "Uur per week") : [],
						m(".editor-peoplelist-section.sub-navigation-label", "Positie"),
					]),

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

								(parsedhours && parsedhours.period.length[0]!=="~") ? m(".editor-peoplelist-person-hours", [
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
								]) : []
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

							//deletebutton
							m("span.editor-peoplelist-person-remove", {
								onclick: function(){vnode.attrs.ondelete(person);}
							}, m("i", {class:"material-icons"}, "close")),

						]);
					}),
					(vnode.attrs.planhours) ?
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

var TypeEditor = function(){
	return {
		view: function(vnode){
			return m(".editor-typeselect", [
				viewModels.typeNames.map(function(t, count){
					return m(".editor-typeselect-type",{
						class: (vnode.attrs.type === count)? "state-selected": "",
						onclick: function(){
							vnode.attrs.onchange(count);
						}
					}, [
						m(".editor-typeselect-type-name", t),
						//m("i", {class:"material-icons hide-icon"}, "info_outline"),
					]);
				})
			]);
		}
	};
};


var ConnectionEditor = function(){
	var selectedProgram;
	var selectedTask;

	return {
		view: function(vnode){
			return [
				vnode.attrs.state ? m(".editor-connectionlist.box-editor-style", [
					m(".editor-connectionlist-list", [
						ptrn("program", function(program){
							return m(".editor-connectionlist-item.item-list",{
								class: ptrn.compare(selectedProgram, program)?"state-selected":"",
								onclick: function(){selectedProgram = program;}
							},[
								m(".editor-connectionlist-item-number", m(Numbering, {node: program})),
								m(".editor-connectionlist-item-name",program.value())
							]);
						})
					]),
					m(".editor-connectionlist-list", [
						selectedProgram ? selectedProgram("task", function(task){
							return m(".editor-connectionlist-item.item-list",{
								class: ptrn.compare(selectedTask,task)?"state-selected":"",
								onclick: function(){
									selectedTask = task;
									ptrn.speculativeRelate(vm.edit(), task);
									selectedProgram = undefined;
									selectedTask = undefined;
									vnode.attrs.onchange();
								}
							},[
								m(".editor-connectionlist-item-number",m(Numbering, {node: task})),
								m(".editor-connectionlist-item-name",task.value()),
								m("i.material-icons .connectionlist-addbutton", "add"),
							]);
						}) : []
					])
				]) : [],

				m(".editor-connections-parents", [
					vm.edit()("task", function(parent){
						return m(".editor-connections-parent.state-selected",[
							m(Numbering, {node: parent, whole: true}),
							//m(".button-number.editor-connections-parent-number", parent("program")("order").value()),
							//m(".button-number.editor-connections-parent-number", parent("order").value()),
							m(".editor-connections-parent-name.body-text", parent.value()),
							(vm.edit()("task",function(e){return e;}).length > 1) ? m("span.editor-connections-parent-remove", {
								onclick: function(){
									ptrn.speculativeUnrelate(vm.edit(), parent);
									vnode.attrs.onchange();
								}
							}, "Verwijderen") : [],
						]);
					})
				])
			];
		}
	};
};
