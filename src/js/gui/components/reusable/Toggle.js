var Toggle = function(){
	function isProgramLeader(){
		return (vm.edit()("task program role:leader #"+vm.user().node).id() > -1);
	}

	return {
		view: function(vnode){
			return m("div.toggle", [
				(isProgramLeader() && vnode.attrs.value===-2) ? [
					m(".status-labels", {
						class: "state-off",
						onclick: function(){
							vnode.attrs.onchange(-1);
						},
					}, "Afkeuren"),
					m(".status-labels", {
						class: "state-off",
						onclick: function(){
							vnode.attrs.onchange(0);
						},
					}, "Goedkeuren")
				] : [
					m(".status-labels", {
						class: (vnode.attrs.value===-1)?"state-on":"state-off",
						onclick: function(){
							vnode.attrs.onchange(-1);
						},
					}, vnode.attrs.label_sketch),

					m(".status-labels", {
						class: (vnode.attrs.value===-2 || vnode.attrs.value===0)?"state-on":"state-off",
						onclick: function(){
							vnode.attrs.onchange(-2);
						},
					}, (vnode.attrs.value===0) ? vnode.attrs.label_definitive : vnode.attrs.label_submitted),
				]
			]);
		}
	};
};
