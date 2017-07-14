var Toggle = function(){
	return {
		view: function(vnode){
			return m("div.toggle", [
				m(".status-labels", {
					class: vnode.attrs.value?"state-on":"state-off",
					onclick: function(){
						vnode.attrs.onchange(-1);
					},
				}, vnode.attrs.label-sketch), 			
			
				m(".status-labels", {
					class: vnode.attrs.value?"state-off":"state-on",
					onclick: function(){
						vnode.attrs.onchange(0);
					},
				}, vnode.attrs.label-definitive), 
			]);
		}
	};
};
