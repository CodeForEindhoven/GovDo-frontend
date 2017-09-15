var EffortEditor = function(){
	var state = false;
	var state2 = false;
	return {
		view: function(vnode){
			return m(".efforteditor",[

				m(".editor-subtitle", "Inspanning titel"),
				m(TextArea, {
					value: viewModels.editMode.content().name,
					onchange: function(v){
						viewModels.editMode.setContent("name", v);
					}
				}),

				m(".editor-subtitle", "Type"),
				m(TypeEditor, {
					type: viewModels.editMode.content().type,
					startdate: viewModels.editMode.content().startdate,
					enddate: viewModels.editMode.content().enddate,
					onchange: function(v){
						viewModels.editMode.setContent("type", v);
					},
					onchangeStartDate: function(v){
						viewModels.editMode.setContent("startdate", v);
					},
					onchangeEndDate: function(v){
						viewModels.editMode.setContent("enddate", v);
					}
				}),

				m(".editor-subtitle", "Beoogd Effect"),
				m(TextArea, {
					value: viewModels.editMode.content().description,
					onchange: function(v){
						viewModels.editMode.setContent("description", v);
					}
				}),

				m(".editor-subtitle", "Eindproduct"),
				m(TextArea, {
					value: viewModels.editMode.content().endproduct,
					onchange: function(v){
						viewModels.editMode.setContent("endproduct", v);
					}
				}),


				m(".editor-subtitle-header",[
					m("span.editor-subtitle", "Mensen"),
					m(".icons-header", [
						m("i.material-icons", {
							onclick: function(e){
								state = !state;
							}
						},"add")
					]),
				]),

				m(PeopleListEditor, {
					value: viewModels.editMode.content().People,
					onchange: function(v){
						viewModels.editMode.setContent("People", v);
						state = false;
					},
					state: state
				}),

				m(".editor-subtitle-header",[
					m("span.editor-subtitle", "Gerelateerde Opgaven"),
					m(".icons-header", [
						m("i.material-icons", {
							onclick: function(e){
								state2 = !state2;
							}
						},"add")
					]),
				]),
				m(ConnectionEditor, {
					id: viewModels.editMode.content().id,
					state: state2,
					onchange: function(){
						state2 = false;
					}
				}),

				m(".editor-subtitle-header",[
					m("span.editor-subtitle", "Status"),
				]),

				m(".status-content",[
					m(Toggle, {
						value: viewModels.editMode.content().mode,
						label_sketch: "Voorstel",
						label_definitive: "Definitief",
						onchange: function(v){
							viewModels.editMode.setContent("mode", v);
						}
					}),
				]),


			]);
		}
	};
};

var PeopleListEditor = function(){
	//var state = false;
	var value = "";

	var onadd = function(person, vnode){
		var people = vnode.attrs.value;
		for(var i = people.length - 1; i >= 0; i--) {
			if(people[i].id === person.id) {
				return;
			}
		}
		people.push(person);
		vnode.attrs.onchange(people);
	};

	var onnew = function(vnode){
		Models.Person.newItem(value, function(p){
			Models.Person.loadTeams();
			Models.Person.loadPeople();
			onadd({
				id: p.id,
				name: p.name
			}, vnode);
			value = "";
		});
	};

	var onremove = function(person, vnode){
		var people = vnode.attrs.value;
		for(var i = people.length - 1; i >= 0; i--) {
			if(people[i].id === person.id) {
				people.splice(i, 1);
			}
		}
		vnode.attrs.onchange(people);
	};

	return {
		view: function(vnode){
			return m(".editor-peoplelist", [
				m(".editor-peoplelist-finder", {
					class: vnode.attrs.state ? "":"state-hidden"
				},[
					m("input.input.editor-peoplelist-searchbar", {
						placeholder: "Voornaam Achternaam",
						oninput: m.withAttr("value", function(v) {value = v;}),
						onchange: m.withAttr("value", function(v) {value = v;}),
						value: value
					}),
					(value.length > 0)?
						m(FilteredPeopleList, {
							value: value,
							allownew: true,
							onadd: function(p){onadd(p, vnode);},
							onnew: function(){onnew(vnode);}
						})
					:
						m(TeamList, {
							onadd: function(p){onadd(p, vnode);}
						})
				]),

				vnode.attrs.value.map(function(person){
					return m(".editor-peoplelist-person", [
						m("span", person.name),
						m("span.editor-peoplelist-person-remove", {
							onclick: function(){onremove(person, vnode);}
						}, m("i", {class:"material-icons"}, "close")),
					]);
				}),
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
						m("i", {class:"material-icons hide-icon"}, "info_outline"),

						m(".editor-typeselect-type-timespan", {
							class: (vnode.attrs.type === count && count<2)? "state-visible": "",
						},[
							//m(".editor-typeselect-type-timespan-subtitle","van"),
							//m(".editor-typeselect-type-timespan-timebox",
							//	m(DatePicker, {
							//		value: vnode.attrs.startdate,
							//		onchange: vnode.attrs.onchangeStartDate
							//	})
							//),
							//m(".editor-typeselect-type-timespan-subtitle","t/m"),
							//m(".editor-typeselect-type-timespan-timebox",
							//	m(DatePicker, {
							//		value:  vnode.attrs.enddate,
							//		onchange: vnode.attrs.onchangeEndDate
							//	})
							//),
						]),
					]);
				})
			]);
		}
	};
};

var ConnectionEditor = function(){
	Models.Overview.loadContent();
	var selected = 0;
	var selected1 = 0;
	var selected2 = -1;
	return {
		view: function(vnode){
			count = -1;
			return [
				vnode.attrs.state ? m(".editor-connectionlist", [
					m(".editor-connectionlist-list", [
						Models.Overview.getContent().map(function(domain, domaincount){
							return domain.Programs.map(function(program, programcount){
								count++;
								return m(".editor-connectionlist-item",{
									class: (selected1 === programcount && selected == domaincount)?"state-selected":"",
									onclick: (function(d,c){
										return function(){
											selected = d;
											selected1 = c;
											selected2 = -1;
										};
									})(domaincount, programcount)
								},[
									m(".button-number.editor-connectionlist-item-number",count+1),
									m(".editor-connectionlist-item-name",program.name)
								]);
							});

						})
					]),
					m(".editor-connectionlist-list", [
						Models.Overview.getContent()[selected] ? Models.Overview.getContent()[selected].Programs[selected1].Tasks.map(function(elem, count){
							return m(".editor-connectionlist-item",{
								class: (selected2 === count)?"state-selected":"",
								onclick: function(){
									selected2 = count;
									Models.Overview.setParent(elem.id, vnode.attrs.id, function(){
										vnode.attrs.onchange();
										m.redraw();

									});
								}
							},[
								m(".button-number.editor-connectionlist-item-number",count+1),
								m(".editor-connectionlist-item-name",elem.name),
								m("i.material-icons .connectionlist-addbutton", "add"),
							]);
						}) : []
					])
				]) : [],

				m(".editor-connections-parents", [
					Models.Overview.getParents(vnode.attrs.id).map(function(parent){
						return m(".editor-connections-parent.state-selected",[
							m(".button-number.editor-connections-parent-number", parent.program.count),
							m(".button-number.editor-connections-parent-number", parent.task.count),
							m(".editor-connections-parent-name", parent.program.name+" - "+parent.task.name),
							(Models.Overview.getParents(vnode.attrs.id).length > 1) ? m("span..editor-connections-parent-remove", {
								onclick: function(){
									Models.Overview.removeParent(parent.task.id, vnode.attrs.id, function(){
										vnode.attrs.onchange();
										m.redraw();
									});
								}
							}, m("i", {class:"material-icons"}, "close")) : [],
						]);
					})
				])
			];
		}
	};
};
