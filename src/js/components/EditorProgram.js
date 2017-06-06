var EditorProgram = function(){
	var opened = false;

	var title = "";
	var mission = "";
	var id = -1;

	var caret;

	return {
		oninit: function(vnode){
			vnode.attrs.open(function(properties){
				opened = true;
				console.log(properties);
				if(properties){
					title = properties.name;
					mission = properties.mission;
					id = properties.id;
				} else {
					title = "";
					mission = "";
					id = -1;
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
						m(".editor",[
							m(".name.top", vnode.attrs.title),
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
								m(".name", "Titel"),
								m("input.input[placeholder=Titel][autofocus=true][wrap=hard]", {
									oninput: m.withAttr("value", function(v) {title = v;}),
									value: title,
									oncreate: function(vnode){
										setTimeout(function () {
											vnode.dom.focus();
										}, 10);
									}
								}),
								m(".name", "Missie"),
								m("textarea.textarea[placeholder=Missie][wrap=hard]", {
									oninput: m.withAttr("value", function(v) {mission = v;}),
									value: mission,
									//stupid ie textarea caret
									onbeforeupdate: function(vnode, old){
										caret = old.dom.selectionStart;
									},
									onupdate: function(vnode){
										vnode.dom.selectionStart = caret;
										vnode.dom.selectionEnd = caret;
									}
								}),
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
