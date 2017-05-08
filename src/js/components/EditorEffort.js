var EditorEffort = function(){
	var opened = false;

	var title = "";
	var id = -1;
	var type = -1;

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
					m(".editor",[
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
								value: type,
								onchange: function(event){
									vnode.attrs.onsetType(id, parseInt(event.target.value-1));
									type =  event.target.value;
								}
							}, [
								m("option", {value: -1, disabled: true, selected: true}, "kies type..."),
								types.map(function(t, c){
									return m("option", {value: c+1}, t);
								})
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
