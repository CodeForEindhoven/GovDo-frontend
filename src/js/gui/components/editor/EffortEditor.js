var EffortEditor = function(){
	var state = false;
	var state2 = false;
	return {
		view: function(vnode){
			return m(".efforteditor",[

				m(".editor-section",[
					m(".editor-section-title", "Beschrijving"),

					m(".editor-row",[
						m(".editor-column",[
							m(".editor-subtitle", "Inspanning titel"),
							m(TextArea, {
								value: vm.edit().value(),
								onchange: function(v){
									vm.edit().update(v);
									//viewModels.editMode.setContent("name", v);
								}
							}),
						]),

						m(".editor-column",[
							m(".editor-subtitle", "Type"),
							m(TypeEditor, {
								type: vm.edit()("type").value(),
								onchange: function(v){
									vm.edit()("type").update(v);
									//viewModels.editMode.setContent("type", v);
								},
							}),
						]),
					]),

					m(".editor-row",[
						m(".editor-column",[
							m(".editor-subtitle", "Beoogd Effect"),
							m(TextArea, {
								value: vm.edit()("description").value(),
								onchange: function(v){
									vm.edit()("description").update(v);
								},
							}),
						]),

						m(".editor-column",[
							m(".editor-subtitle", "Eindproduct"),
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
					m(".editor-section-title", "Mensen"),

					m(".editor-subtitle-header",[
						m("span.editor-subtitle", "Team"),
						m(".icons-header", [
							m("i.material-icons", {
								onclick: function(e){
									state = !state;
								}
							},"add")
						]),
					]),

					m(PeopleListEditor, {
						parent: vm.edit(),
						onchange: function(v){
							//viewModels.editMode.setContent("People", v);
							state = false;
						},
						state: state
					}),
				]),


				//Planning
				//m(".editor-section",[
				//	m(".editor-section-title", "Planning"),
				//	m(".editor-subtitle", "Periode"),


				//	m("editor-selection-date",[
				//		m("span", "van"),
				//		m(DatePicker)
				//	]),

				//	m("editor-selection-date",[
				//		m("span", "t/m"),
				//		m(DatePicker)
				//	]),


				//]),

				//m(".editor-section",[
				//	m(".editor-section-title", "Positionering"),

				//	m(".editor-subtitle-header",[
				//		m("span.editor-subtitle", "Gerelateerde Opgaven"),
				//		m(".icons-header", [
				//			m("i.material-icons", {
				//				onclick: function(e){
				//					state2 = !state2;
				//				}
				//			},"add")
				//		]),
				//	]),
				//	m(ConnectionEditor, {
				//		id: viewModels.editMode.content().id,
				//		state: state2,
				//		onchange: function(){
				//			state2 = false;
				//		}
				//	}),
				//]),

				//m(".editor-section",[
				//	m(".editor-section-title", "Status"),

				//	m(".status-content",[
				//		m(Toggle, {
				//			value: viewModels.editMode.content().mode,
				//			label_sketch: "Voorstel",
				//			label_definitive: "Goedgegeurd",
				//			onchange: function(v){
				//				viewModels.editMode.setContent("mode", v);
				//			}
				//		}),
				//	]),
				//]),


			]);
		}
	};
};

var PeopleListEditor = function(){
	//var state = false;
	var value = "";

	//var onadd = function(person, vnode){
	//	var people = vnode.attrs.value;
	//	for(var i = people.length - 1; i >= 0; i--) {
	//		if(people[i].id === person.id) {
	//			return;
	//		}
	//	}
	//	people.push(person);
	//	vnode.attrs.onchange(people);
	//};

	//var onnew = function(vnode){
	//	Models.Person.newItem(value, function(p){
	//		Models.Person.loadTeams();
	//		Models.Person.loadPeople();
	//		onadd({
	//			id: p.id,
	//			name: p.name
	//		}, vnode);
	//		value = "";
	//	});
	//};

	var onremove = function(parent, person){
		ptrn.unrelate(parent, person);
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
					//(value.length > 0)?
					//	m(FilteredPeopleList, {
					//		value: value,
					//		allownew: true,
					//		onadd: function(p){onadd(p, vnode);},
					//		onnew: function(){onnew(vnode);}
					//	})
					//:
					//	m(TeamList, {
					//		onadd: function(p){onadd(p, vnode);}
					//	})
				]),

				vnode.attrs.parent("person", function(person){
					return m(".editor-peoplelist-person", [
						m("span", person.value()),
						m("span.editor-peoplelist-person-remove", {
							onclick: function(){onremove(vnode.attrs.parent, person);}
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
							m(".editor-typeselect-type-timespan-subtitle","van"),
							m(".editor-typeselect-type-timespan-timebox",
								m(DatePicker, {
									value: vnode.attrs.startdate,
									onchange: vnode.attrs.onchangeStartDate
								})
							),
							m(".editor-typeselect-type-timespan-subtitle","t/m"),
							m(".editor-typeselect-type-timespan-timebox",
								m(DatePicker, {
									value:  vnode.attrs.enddate,
									onchange: vnode.attrs.onchangeEndDate
								})
							),
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
