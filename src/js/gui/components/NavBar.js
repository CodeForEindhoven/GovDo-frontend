var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[
				m(ProgramNav),
				m(SearchBar)
			]);
		}
	};
};
