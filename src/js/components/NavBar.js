var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[
				m(".name", Models.Task.getName())
			]);
		}
	};
};
