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
						m("input.selector-selected-title", {
							value: task.value(),
							oninput: function(e){
								task.update(e.target.value);
							},
							oncreate: function(vnode){
								vnode.dom.focus();
							},
							placeholder: vnode.attrs.placeholder
						}),
						m(".button.selector-inplace-editor-button", {
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
