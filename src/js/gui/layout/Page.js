var Page = function(){
	return {
		view: function(vnode){
			return [
				m(NavBar),
				//m(Viewer),
			];
		}
	};
};
