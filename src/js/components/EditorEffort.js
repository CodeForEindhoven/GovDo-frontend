var EditorEffort = function(){
	var opened = false;

	var title = "";
	var id = -1;
	var type = -1;
	var people = [];
	var peopleupdates = [];

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
									vnode.attrs.onsave(id, title, type, peopleupdates);
									id = -1;
									title = "";
									type = -1;
									people = [];
									peopleupdates = [];
									opened = false;
								}
							}, [
								m(".column",[
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
									m(TypeSelector, {
										type: type,
										onset: function(t){
											type = t;
										}
									})
								]),
								m(".column",[
									m(PersonSelector, {
										people: people,
										onadd: function(name){

											peopleupdates.push({
												addremove: "add",
												person: name
											});
											people.push({
												name: name
											});
										},
										onremovePerson: function(name){
											peopleupdates.push({
												addremove: "remove",
												person: name
											});
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
				m(".name", "Type"),
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
				//m("select.select", {
				//	value: vnode.attrs.type+1,
				//	onchange: function(event){
				//		//vnode.attrs.onsetType(id, parseInt(event.target.value-1));
				//		vnode.attrs.onset(parseInt(event.target.value-1));
				//	}
				//}, [
				//	m("option", {value: -1, disabled: true, selected: true}, "kies type..."),
				//	types.map(function(t, c){
				//		return m("option", {value: c+1}, t);
				//	})
				//])
			];
		}
	};
};
