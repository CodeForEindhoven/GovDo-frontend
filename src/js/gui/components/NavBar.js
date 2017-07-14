var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[
				m(".nav-dashbutton",[
					m(".nav-dashbutton-icon")
				]),
				m(SearchBar)
			]);
		}
	};
};
