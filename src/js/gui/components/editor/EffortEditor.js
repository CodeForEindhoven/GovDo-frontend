var EffortEditor = function(){
	var stateTeam = false;
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
					m(".editor-section-title", "Positionering"),

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
						state: state2,
						onchange: function(){
							state2 = false;
						}
					}),
				]),

				m(".editor-section",[
					m(".editor-section-title", "Mensen"),

					m(".editor-subtitle-header",[
						m("span.editor-subtitle", "Team"),
						m(".icons-header", [
							m("i.material-icons", {
								onclick: function(e){
									stateTeam = !stateTeam;
								}
							},"add")
						]),
					]),

					m(PeopleListEditor, {
						parent: vm.edit(),
						onadd: function(v){
							ptrn.speculativeRelate(vm.edit(), v);
							stateTeam = false;
						},
						ondelete: function(v){
							ptrn.speculativeUnrelate(vm.edit(), v);
						},
						onsetrole: function(v){
							//console.log(v);
							ptrn.speculativeRelate(vm.edit(), v("role:leader"));
						},
						onunsetrole: function(v){
							console.log(v);
							ptrn.speculativeUnrelate(vm.edit(), v("role:leader"));
						},
						state: stateTeam
					}),
				]),


				//Planning
				m(".editor-section",[
					m(".editor-section-title", "Planning"),
					m(".editor-subtitle", "Periode"),


					m(".editor-selection-date",[
						m("span", "van"),
						m(DatePicker,{
							value: vm.edit()("startdate").value(),
							onchange: function(e){
								console.log("update: "+e);
								vm.edit()("startdate").update(e);
							}
						})
					]),

					m(".editor-selection-date",[
						m("span", "t/m"),
						m(DatePicker,{
							value: vm.edit()("enddate").value(),
							onchange: function(e){
								console.log("update: "+e);
								vm.edit()("enddate").update(e);
							}
						})
					]),


				]),

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
	var state = false;
	var value = "";

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
							onadd: function(p){vnode.attrs.onadd(p);},
							//onnew: function(){onnew(vnode);}
						})
					:
						m(TeamList, {
							onadd: function(p){vnode.attrs.onadd(p);}
						})
				]),

				vnode.attrs.parent("person", function(person){
					return m(".editor-peoplelist-person", [

						//name
						m("span", person.value()),

						//role picker
						m("span", person("role:leader #"+vnode.attrs.parent.id()).id()>0 ?
							m("span", {
								onclick: function(){
									vnode.attrs.onunsetrole(person);
								}
							},"Trekker")
							:
							m("span", {
								onclick: function(){
									vnode.attrs.onsetrole(person);
								}
							},"Teamlid")
						),

						//deletebutton
						m("span.editor-peoplelist-person-remove", {
							onclick: function(){vnode.attrs.ondelete(person);}
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
				vnode.attrs.state ? m(".editor-connectionlist", [
					m(".editor-connectionlist-list", [
						ptrn("program", function(program){
							return m(".editor-connectionlist-item",{
								class: ptrn.compare(selectedProgram, program)?"state-selected":"",
								onclick: function(){selectedProgram = program;}
							},[
								m(".button-number.editor-connectionlist-item-number",program("order").value()),
								m(".editor-connectionlist-item-name",program.value())
							]);
						})
					]),
					m(".editor-connectionlist-list", [
						selectedProgram ? selectedProgram("task", function(task){
							return m(".editor-connectionlist-item",{
								class: ptrn.compare(selectedTask,task)?"state-selected":"",
								onclick: function(){
									selectedTask = task;
									ptrn.speculativeRelate(vm.edit(), task);
									selectedProgram = undefined;
									selectedTask = undefined;
									vnode.attrs.onchange();
								}
							},[
								m(".button-number.editor-connectionlist-item-number",task("order").value()),
								m(".editor-connectionlist-item-name",task.value()),
								m("i.material-icons .connectionlist-addbutton", "add"),
							]);
						}) : []
					])
				]) : [],

				m(".editor-connections-parents", [
					vm.edit()("task", function(parent){
						return m(".editor-connections-parent.state-selected",[
							m(".button-number.editor-connections-parent-number", parent("program")("order").value()),
							m(".button-number.editor-connections-parent-number", parent("order").value()),
							m(".editor-connections-parent-name", parent.value()),
							(vm.edit()("task",function(e){return e;}).length > 1) ? m("span.editor-connections-parent-remove", {
								onclick: function(){
									ptrn.speculativeUnrelate(vm.edit(), parent);
									vnode.attrs.onchange();
								}
							}, m("i", {class:"material-icons"}, "close")) : [],
						]);
					})
				])
			];
		}
	};
};
