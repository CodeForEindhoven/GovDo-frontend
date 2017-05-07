var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[
				m(".name", "Planlab"),
				m("img.arrow", {src: "arrow.png"}),
				m(".name", "Sociaal Domein"),
				m("img.arrow", {src: "arrow.png"}),
				m(".name", Models.Task.getName())
			]);
		}
	};
};
