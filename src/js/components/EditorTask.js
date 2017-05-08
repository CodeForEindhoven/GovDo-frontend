var EditorTask = function(){
	var opened = false;

	var title = "";
	var id = -1;

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
							m("textarea.textarea[placeholder=Opgave][autofocus=true][wrap=hard]", {
								oninput: m.withAttr("value", function(v) {title = v;}),
								value: title,
								oncreate: function(vnode){
									setTimeout(function () {
										vnode.dom.focus();
									}, 10);
								}
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
