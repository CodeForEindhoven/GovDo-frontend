var EffortEditor = function(){
	return {
		view: function(vnode){
			return m(".efforteditor",[
				m(".editor-subtitle", "Inspanning titel"),
				m(TextArea, {
					value: viewModels.editMode.content().name,
					placeholder: "title",
					onchange: function(v){
						viewModels.editMode.setContent("name", v);
					}
				}),

				m(".editor-subtitle", "Inspanning beschrijving"),
				m(TextArea, {
					value: viewModels.editMode.content().description,
					placeholder: "beschrijving",
					onchange: function(v){
						viewModels.editMode.setContent("description", v);
					}
				}),

				m(".editor-subtitle", "Mensen"),
				m(PeopleListEditor, {
					value: viewModels.editMode.content().People,
					onchange: function(v){
						viewModels.editMode.setContent("People", v);
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
			]);
		}
	};
};

var PeopleListEditor = function(){
	return {
		view: function(vnode){
			return m(".editor-peoplelist", [
				vnode.attrs.value.map(function(person){
					return m(".editor-peoplelist-person", [
						m("span", person.name),
						m("span.editor-peoplelist-person-remove", {
							onclick: function(){
								var people = vnode.attrs.value;
								for(var i = people.length - 1; i >= 0; i--) {
									if(people[i].id === person.id) {
										people.splice(i, 1);
									}
								}
								vnode.attrs.onchange(people);
							}
						}, m("i", {class:"material-icons"}, "close")),
					]);
				})
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
