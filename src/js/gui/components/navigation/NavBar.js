var NavBar = function(){

	var dropdownstate = false;

	function hasTodos(){
		var count = ptrn("feedbacksession", function(session){
			var finds = (ptrn("#"+vm.user().node+" role:leader effort type:0 effort", function(ef){
				return ef("feedback:"+session.value()).id();
			}));
			if(finds.length>0){
				return finds.indexOf(-1)<=0;
			} else {
				return false;
			}
		}).reduce(function(org, elem){
			if(elem) org++;
			return org;
		},0);


		count += ptrn("#"+vm.user().node+" role:leader program task effort mode:-2", function(m){return m("effort");}).length;

		return count;
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
							name: "programma-cloud",
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
						(vm.focus()!==undefined && vm.page()!==4) ? [
							(vm.focus().type()!=="person") ? m(".nav-program-number", m(Numbering, {node: vm.focus(), selected: true})) : m(".nav-button", m(Icon, {name: "personal", selected: true})),
							m(".nav-program-title-top", vm.focus().value())
						] : [
							(vm.page()===4) ? [
								m(".nav-program-number", m(".nav-button", m(Icon, {name: "personal", selected: true}))),
								m(".nav-program-title-top", ptrn("#"+vm.user().node).value())
							] : [
								m(".nav-program-number", m(".nav-button", m(Icon, {name: "personal", selected: true}))),
								m(".nav-program-title-top", "Sociaal Domein")
							]
						],
						//(vm.page()=== 1 && vm.person()) ? [
							//,
						//	m(".nav-program-title-top", vm.person().value())
						//] : [],
					]),
					m(".programnav-dropdown-icon", {
						onclick: function(){
							dropdownstate = !dropdownstate;
						}
					}, m("i.material-icons", dropdownstate ? "keyboard_arrow_up" : "keyboard_arrow_down")),
					////m("i.material-icons.programnav-dropdown", dropdownstate ? "arrow_drop_up" : "arrow_drop_down"),
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
