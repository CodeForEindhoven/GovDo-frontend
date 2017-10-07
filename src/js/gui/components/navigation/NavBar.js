var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[
				m(ProgramNav),
				//m(".nav-button", {
				//	onclick: function(){
				//		console.log("click");
				//		vm.page(1);
				//	}
				//}, "dash"),
				//m(".nav-button", {
				//	onclick: function(){
				//		console.log("click");
				//		vm.page(0);
				//	}
				//}, "tree"),
				m(".nav-button", {
					onclick: function(){
						console.log("click");
						vm.page(1);
					}
				}, "cal"),

				//m(".nav-current-position",[
				//	(vm.page()=== 0 && vm.program()) ? [
				//		m(".nav-program-number", m(Numbering, {node: vm.program()})),
				//		m(".nav-program-title-top", vm.program().value())
				//	] : [],
				//])
				//m(SearchBar)
			]);
		}
	};
};
