var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[
				m(ProgramNav),
				m(".nav-button", {
					onclick: function(){
						console.log("click");
						//vm.page(0);
					}
				}, m(Icon, {name: "general"})),

				m(".nav-button", {
					onclick: function(){
						vm.page(0);
					}
				}, m(Icon, {
					name: "programma",
					selected: vm.page()===0
				})),

				m(".nav-button", {
					onclick: function(){
						vm.page(1);
					}
				}, m(Icon, {
					name: "kalendar",
					selected: vm.page()===1
				})),

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
