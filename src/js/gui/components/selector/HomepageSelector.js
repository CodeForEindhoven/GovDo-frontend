var HomepageSelector = function(){
	return {
		view: function(vnode){
			return m(".homepageselector",[
				ptrn("domain", function(domain){
					return m(".programnav-domain.homepageselector-domain",[
						m(".programnav-domain-name", domain.value()),
						domain("program", function(program){
							//count++;
							return m(".state-selectable.programnav-program.default", {
								class: (ptrn.compare(vm.program(),program))?"state-selected":"",
								onclick: function(){
									vm.program(program);
									vm.focus(program);
									vm.page(0);
								}
							},[
								m(".programnav-program-number", m(Numbering, {node: program})),
								m(".programnav-program-title", program.value()),
								//m(".programbar-program-mission", program.mission)
							]);
						}),
					]);
				}),
			]);
		}
	};
};
