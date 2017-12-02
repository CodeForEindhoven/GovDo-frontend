var NavBar = function(){

	var dropdownstate = false;

	function hasTodos(){
		return ptrn("feedbacksession", function(session){
			return (ptrn("#"+vm.user().node+" role:leader effort type:0 effort", function(ef){
				return ef("feedback:"+session.value()).id();
			}).indexOf(-1)<0);
		}).reduce(function(org, elem){
			if(!elem) org++;
			return org;
		},0);
	}

	return {
		view: function(vnode){
			return m("nav",[

				m(".programnav",[



					m(".nav-button", {
						onclick: function(){
							vm.page(2);
						},
					}, [
						m(Icon, {
							name: "general",
							selected: vm.page()===2
						}),
						m(".nav-tooltip", "Dashboard")
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

					m(".nav-current-position", {
						onclick: function(){
							dropdownstate = !dropdownstate;
						}
					},[
						//(vm.page()=== 0 && vm.program()) ? [
							(vm.focus().type()!=="person") ? m(".nav-program-number", m(Numbering, {node: vm.focus(), selected: true})) : [],
							m(".nav-program-title-top", ((vm.page()===4) ? ptrn("#"+vm.user().node).value() : vm.focus().value()))
						//] : [],
						//(vm.page()=== 1 && vm.person()) ? [
							//m(".nav-button", m(Icon, {name: "meeting-2"})),
						//	m(".nav-program-title-top", vm.person().value())
						//] : [],
					]),
					//m("i.material-icons.programnav-dropdown", dropdownstate ? "arrow_drop_up" : "arrow_drop_down"),
				]),

				m(DropdownNav, {
					state: dropdownstate,
					onpick: function(){
						dropdownstate = false;
					}
				}),



				m(".nav-right", [
					m(".nav-connecting", vm.connecting() ? [
						m("span", "laden "),
						m(".smallloading", "")
					] : []),

					//User Icon
					m(".nav-user", {
						onclick: function(){
							if(vm.login()===0){
								vm.page(4);
							} else {
								vm.login(1);
							}
						}
					}, [
						(vm.login()===0) ? [
							m(".nav-user-login", m(Icon, {name: "personal", selected: true} )),
							m(".nav-user-name", ptrn("#"+vm.user().node).value()),
							(hasTodos()>0) ? m(".nav-user-todo",hasTodos()) : [] //ptrn("#"+vm.user().node).value()
						] : [
							m(".nav-user-login", m(Icon, {name: "personal", selected: false})),
						]
					])
				])
				//m(SearchBar)
			]);
		}
	};
};
