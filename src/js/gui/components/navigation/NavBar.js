var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[
				m(ProgramNav),
				m(".programnav-program-number.button-number", {
					onclick: function(){

					}
				},"dash"),
				m(".programnav-program-number.button-number", {
					onclick: function(){
						console.log("click");
						vm.page(1);
					}
				}, "cal"),
				//m(SearchBar)
			]);
		}
	};
};
