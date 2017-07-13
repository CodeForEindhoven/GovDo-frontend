var Toggle = function(){
	return {
		view: function(vnode){
			return m("div.toggle", {
				class: vnode.attrs.value?"state-on":"state-off",
				onclick: function(){
					vnode.attrs.onchange();
				},
			}, vnode.attrs.label);
		}
	};
};
