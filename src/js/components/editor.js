var Editor = function(){
	var opened = false;

	var title = "";
	var mission = "";
	var id = -1;

	return {
		oninit: function(vnode){

			vnode.attrs.open(function(properties){
				opened = true;
				console.log(properties);
				if(properties){
					title = properties.name;
					mission = properties.mission;
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
						m(".name", "Programma"),
						m("form.form", {
							onsubmit: function(e) {
								e.preventDefault();
								vnode.attrs.onsave(id, title, mission);
								id = -1;
								title = "";
								mission = "";
								opened = false;
							}
						}, [
							m("input.input[placeholder=Titel][autofocus=true][wrap=hard]", {
								oninput: m.withAttr("value", function(v) {title = v;}),
								value: title,
								oncreate: function(vnode){
									setTimeout(function () {
										vnode.dom.focus();
									}, 10);
								}
							}),
							m("textarea.textarea[placeholder=Missie][autofocus=true][wrap=hard]", {
								oninput: m.withAttr("value", function(v) {mission = v;}),
								value: mission
							}),
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
