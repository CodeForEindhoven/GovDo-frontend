var InplaceEditor = function(){
	return {
		view: function(vnode){
			var task = vnode.attrs.element;
			return [
				m(".state-selectable.selectorlist-item", {
					class: "state-selected",
				},[
					m(".selectorlist-item-number",  {
						onclick: function(){selectItem(task);},
					}, [
						m(Numbering, {node: task}),
					]),
					m(".selectorlist-item-content", [
						m("textarea.selector-selected-title", {
							rows: 1,
							value: task.value(),
							onblur: function(){
								if(task.value()===""){
									vnode.attrs.onclose(task);
								}
							},
							oninput: function(e){
								task.update(e.target.value);
							},
							oncreate: function(vnode){
								var text = vnode.dom;

								if (window.attachEvent) {
									observe = function (element, event, handler) {
									    element.attachEvent('on'+event, handler);
									};
								} else {
									observe = function (element, event, handler) {
									    element.addEventListener(event, handler, false);
									};
								}

								function resize () {
								    text.style.height = 'auto';
								    text.style.height = text.scrollHeight+'px';
								}
								/* 0-timeout to get the already changed text */
								function delayedResize () {
								    window.setTimeout(resize, 0);
								}
								observe(text, 'change',  resize);
								observe(text, 'cut',     delayedResize);
								observe(text, 'paste',   delayedResize);
								observe(text, 'drop',    delayedResize);
								observe(text, 'keydown', delayedResize);

								text.focus();
								text.select();
								resize();
							},
							placeholder: vnode.attrs.placeholder
						}),
						m(".button.selector-inplace-editor-button.button.selector-inplace-editor-button-options", {
							onclick: function(){vnode.attrs.onmore(task);}
						},"Meer opties"),
						m(".button.selector-inplace-editor-button", {
							onclick: function(){vnode.attrs.onsave(task);}
						},"Opslaan"),
						m(".button.selector-inplace-editor-button.selector-inplace-editor-button-cancel", {
							onclick: function(){vnode.attrs.onclose(task);}
						},"Annuleren"),
					]),
				])
			];
		}
	};
};
