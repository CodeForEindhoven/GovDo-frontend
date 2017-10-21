var NavBar = function(){

	return {
		view: function(vnode){
			return m("nav",[

				m(".nav-button", {
					onclick: function(){
						console.log("click");
						vm.page(2);
					},
				}, [
					m(Icon, {name: "general"}),
					m(".nav-tooltip", "Statistieken")
				]),

				m(".nav-button", {
					onclick: function(){
						vm.page(0);
					}
				}, [
					m(Icon, {
						name: "programma",
						selected: vm.page()===0
					}),
					m(".nav-tooltip", "Doelenboom")
				]),

				m(".nav-button", {
					onclick: function(){
						vm.page(1);
					}
				}, [
					m(Icon, {
						name: "kalendar",
						selected: vm.page()===1
					}),
					m(".nav-tooltip", "Kalender")
				]),

				//m(ProgramNav),

				m(".nav-current-position",[
					(vm.page()=== 0 && vm.program()) ? [
						m(".nav-program-number", m(Numbering, {node: vm.program(), selected: true})),
						m(".nav-program-title-top", vm.program().value())
					] : [],
					(vm.page()=== 1 && vm.person()) ? [
						//m(".nav-button", m(Icon, {name: "meeting-2"})),
						m(".nav-program-title-top", vm.person().value())
					] : [],
				]),

				m(".nav-user", [
					(vm.login()===0) ? [
						m(".nav-user-login", {
							onclick: function(){
								vm.page(4);
							}
						}, m(Icon, {name: "personal", selected: true} )) //ptrn("#"+vm.user().node).value()
					] : [
						m(".nav-user-login", {
							onclick: function(){
								vm.login(1);
							}
						}, m(Icon, {name: "personal"})),
					]
				])
				//m(SearchBar)
			]);
		}
	};
};
