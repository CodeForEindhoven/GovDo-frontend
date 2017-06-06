var EditorTask = function(){
	var opened = false;

	var title = "";
	var id = -1;
	var caret = 0;

	return {
		oninit: function(vnode){
			vnode.attrs.open(function(properties){
				opened = true;
				if(properties){
					title = properties.name;
					id = properties.id;
				} else {
					title = "";
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
									vnode.attrs.onsave(id, title);
									id = -1;
									title = "";
									opened = false;
								}
							}, [
								m(".name", "Beschrijving"),
								m("textarea.textarea[placeholder=Opgave][wrap=hard]", {
									oninput: m.withAttr("value", function(v) {title = v;}),
									value: title,
									oncreate: function(vnode){
										setTimeout(function () {
											vnode.dom.focus();
										}, 10);
									},
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
