var EditorEffort = function(){
	var opened = false;

	var title = "";
	var id = -1;
	var type = -1;
	var people = [];

	return {
		oninit: function(vnode){
			vnode.attrs.open(function(properties){
				opened = true;

				if(properties){
					title = properties.name;
					id = properties.id;
					people = properties.People;
					type = properties.type;
				}
			});
		},
		view: function(vnode){
			if(opened===true){
				return [
					m(".fullscreen",[
						m(".grey",{
							onclick: function(){
								opened = false;
							}
						}),
						m(".editor.wide",[
							m(".name", vnode.attrs.title),
							m("form.form", {
								onsubmit: function(e) {
									e.preventDefault();
									vnode.attrs.onsave(id, title, type, people);
									id = -1;
									title = "";
									type = -1;
									people = [];
									opened = false;
								}
							}, [
								m(".name", "Naam"),
								m("input.input[placeholder=Inspanning][autofocus=true][wrap=hard]", {
									oninput: m.withAttr("value", function(v) {title = v;}),
									value: title,
									oncreate: function(vnode){
										setTimeout(function () {
											vnode.dom.focus();
										}, 10);
									}
								}),
								m(".column",[
									m(".name", "Type"),
									m(TypeSelector, {
										type: type,
										onset: function(t){
											type = t;
										}
									})
								]),
								m(".column",[
									m(".name", "Mensen"),
									m(PersonList, {
										people: people,
										onadd: function(person){
											people.push(person);
										},
										onremovePerson: function(person){
											for(var i = people.length - 1; i >= 0; i--) {
												if(people[i].id === person.id) {
													people.splice(i, 1);
												}
											}
										},
										effort: id
									}),
								]),
								m(".spacer", {style: "clear: both"}),
								m("button.button[type=submit]", "Opslaan")
							])
						])
					])
				];
			} else {
				return m("");
			}

		}
	};
};

var TypeSelector = function(){
	var types = [
		"Project",
		"Programma",
		"Routine",
		"Proces",
		"Improvisatie",
		"Klusje"
	];

	return {
		view: function(vnode){
			return [
				m(".info.mode", [
					types.map(function(t, count){
						if(count === vnode.attrs.type){
							return m(".type", "[x] "+ t);
						} else {
							return m(".type", { onclick: function(){
								vnode.attrs.onset(count);
							}},"[ ] "+ t);
						}

					})
				])
			];
		}
	};
};

var PersonList = function(){

	var mode = false;

	return {
		view: function(vnode){
			return m(".PersonList", [
				m("div", { onclick: function(){
					mode = !mode;
				}} , "+"),
				vnode.attrs.people.map(function(p){
					return m(".person", {onclick: function(){
						vnode.attrs.onremovePerson(p);
					}}, p.name);
				}),
				mode ? m(PersonSelector, {
					onadd: vnode.attrs.onadd
				}) : m("")
			]);
		}
	};
};
