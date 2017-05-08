var EditorEffort = function(){
	var opened = false;

	var title = "";
	var id = -1;
	var type = -1;
	var people = [];

	var types = [
		"Project",
		"Programma",
		"Routine",
		"Proces",
		"Improvisatie",
		"Klusje"
	];

	return {
		oninit: function(vnode){
			vnode.attrs.open(function(properties){
				opened = true;
				console.log(properties);
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
					m(".grey",{
						onclick: function(){
							opened = false;
						}
					},[]),
					m(".editor.wide",[
						m(".name", vnode.attrs.title),
						m("form.form", {
							onsubmit: function(e) {
								e.preventDefault();
								vnode.attrs.onsave(id, title);
								id = -1;
								title = "";
								opened = false;
							}
						}, [
							m(".column",[
								m("input.input[placeholder=Inspanning][autofocus=true][wrap=hard]", {
									oninput: m.withAttr("value", function(v) {title = v;}),
									value: title,
									oncreate: function(vnode){
										setTimeout(function () {
											vnode.dom.focus();
										}, 10);
									}
								}),
								m("select.select", {
									value: type+1,
									onchange: function(event){
										vnode.attrs.onsetType(id, parseInt(event.target.value-1));
										type = event.target.value-1;
									}
								}, [
									m("option", {value: -1, disabled: true, selected: true}, "kies type..."),
									types.map(function(t, c){
										return m("option", {value: c+1}, t);
									})
								]),
							]),
							m(".column",[
								m(PersonSelector, {
									people: people,
									onadd: function(name){
										Models.Effort.setPerson(id, name);
										//TODO: fix this
										people.push({
											name: name
										});
									},
									onremovePerson: function(name){
										Models.Effort.removePerson(id, name);
										//TODO: fix this
										for(var i = people.length - 1; i >= 0; i--) {
											if(people[i].name === name) {
												people.splice(i, 1);
											}
										}
									},
									effort: id
								}),
							]),
							m("button.button[type=submit]", "Opslaan")
						])
					])
				];
			} else {
				return m("");
			}

		}
	};
};

var PersonSelector = function(){
	var rnd = -1;
	var state = true;
	var value = "";
	var peopleList = [];

	function getPeople(){
		model.get("people", {}, function(data){
			peopleList = data;
		});
	}

	getPeople();

	return {
		view: function(vnode){
			if(rnd!==vnode.attrs.effort){
				rnd = vnode.attrs.effort;
				value = "";
			}
			console.log(vnode.attrs.people);
			return [
				m(".what", "Mensen"),
				m(".info.mode", [
					vnode.attrs.people.map(function(person){
						return m(".person", [
							m("span.n", person.name),
							m("span.remove", {
								onclick: function(){
									console.log("click remove");
									vnode.attrs.onremovePerson(person.name);
								}
							},"-")
						]);
					}),
					m("datalist#people",peopleList.map(function(p){
						return m("option", {value: p.name});
					})),
					m("input.input", {
						list: "people",
						placeholder: "Voornaam Achternaam",
						oninput: m.withAttr("value", function(v) {value = v;}),
						onchange: m.withAttr("value", function(v) {value = v;}),
						value: value
					}),
					m("button", {onclick: function(e){
						e.preventDefault();
						if(value!==""){
							vnode.attrs.onadd(value);
						}
						value = "";
					}},"+")
				]),
			];

		}
	};
};
