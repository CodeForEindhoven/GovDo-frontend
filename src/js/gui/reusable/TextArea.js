var TextArea = function(){

	var caret = 0;

	return {
		view: function(vnode){
			return m("textarea.textarea[wrap=hard]", {
				oninput: m.withAttr("value", function(v) {vnode.attrs.onchange(v);}),
				onchange: m.withAttr("value", function(v) {vnode.attrs.onchange(v);}),

				value: vnode.attrs.value,

				oncreate: function(vnode){
					if(vnode.attrs.autofocus){
						setTimeout(function () {
							vnode.dom.focus();
						}, 10);
					}
				},
				//stupid ie textarea caret
				onbeforeupdate: function(vnode, old){
					caret = old.dom.selectionStart;
				},

				onupdate: function(vnode){
					vnode.dom.selectionStart = caret;
					vnode.dom.selectionEnd = caret;
				}
			});
		}
	};
};
