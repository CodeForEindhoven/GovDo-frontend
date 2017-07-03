var Menu = function(){
	return {
		view: function(vnode){
			return m("nav",[
				m(".layer", [
					m(".type", "domein"),
					m(".title", "Sociaal domein")
				]),
				m("img.arrow", {src: "arrow.png"}),
				m(".layer.top", [
					m(".type", "team"),
					m(".title", vnode.attrs.name)
				])
			]);
		}
	};
};
