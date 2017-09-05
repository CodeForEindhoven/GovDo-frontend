var EffortEditor = function(){
	var state = false;
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

				m(".editor-subtitle", "Inspanning beschrijving"),
				m(TextArea, {
					value: viewModels.editMode.content().description,
					onchange: function(v){
						viewModels.editMode.setContent("description", v);
					}
				}),


				m(".editor-subtitle-header",[
					m("span.editor-subtitle", "Mensen"),
					m(".icons-header", [
						m("i.material-icons", {
							onclick: function(e){
								state = true;
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

				m(".editor-subtitle", "Status"),
				m("i.material-icons", {}, "info_outline"),

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
				vnode.attrs.value.map(function(person){
					return m(".editor-peoplelist-person", [
						m("span", person.name),
						m("span.editor-peoplelist-person-remove", {
							onclick: function(){onremove(person, vnode);}
						}, m("i", {class:"material-icons"}, "close")),
					]);
				}),

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
				])
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
