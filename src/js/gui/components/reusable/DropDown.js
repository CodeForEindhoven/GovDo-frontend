var DropDown = function(){
	var state = false;
	return {
		view: function(vnode){
			return m(".dropdown", [
				m("div.dropdown-value", {
					class: (vnode.attrs.value !== undefined) ? "" : "novalue",
					onclick: function(){
						state = !state;
					}
				}, (vnode.attrs.value !== -1) ? vnode.attrs.options[vnode.attrs.value] : vnode.attrs.novalue),
				state ? m("div.dropdown-options.box-editor-style",[
					[vnode.attrs.novalue].concat(vnode.attrs.options).map(function(option, count){
						return m(".dropdown-option.item-list", {
							class: count===0? "novalue" : "",
							onclick: function(){
								state = false;
								vnode.attrs.onchange(count-1);
							}
						}, option);
					})
				]) : []
			]);
		}
	};
};
