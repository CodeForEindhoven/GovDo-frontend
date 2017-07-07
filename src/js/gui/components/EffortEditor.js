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

				m(".editor-subtitle", "Team"),
				m(PeopleListEditor, {
					value: viewModels.editMode.content().People,
					onchange: function(v){
						viewModels.editMode.setContent("People", v);
					}
				}),

				m(".editor-subtitle", "Type"),
				m(TypeEditor, {
					value: viewModels.editMode.content().type,
					onchange: function(v){
						viewModels.editMode.setContent("type", v);
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
						class: (vnode.attrs.value === count)? ".state-selected": "",
						onclick: function(){
							vnode.attrs.onchange(count);
						}
					}, t);
				})
			]);
		}
	};
};
