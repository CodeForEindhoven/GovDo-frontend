var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[
				m(ProgramNav),
				m(".programnav-program-number.button-number", "D"),
				m(".programnav-program-number.button-number", "C"),
				//m(SearchBar)
			]);
		}
	};
};
