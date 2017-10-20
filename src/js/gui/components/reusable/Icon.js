var Icon = function(){
	var neg = false;
	var hov = false;
	return {
		view: function(vnode){
			if(vnode.attrs.selected !== undefined){
				neg = vnode.attrs.selected;
			}

			return m("img.icon", {
				src: "/icons/planlab-icon-"+vnode.attrs.name+((neg||hov)?"-hover":"")+".svg",
				onmouseover: function(){
					hov = true;
					m.redraw();
				},
				onmouseout: function(){
					hov = false;
					m.redraw();
				}
			});
		}
	};
};
