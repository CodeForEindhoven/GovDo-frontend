var DropdownNav = function(){
	var page = 1;

	return {
		view: function(vnode){
			return [
				vnode.attrs.state ? m(".programnav-popup", {},[
					(page===0) ? ptrn("domain", function(domain){
						return m(".programnav-domain",[
							m(".programnav-domain-name", domain.value()),
							domain("program", function(program){
								//count++;
								return m(".state-selectable.programnav-program", {
									class: (ptrn.compare(vm.program(),program))?"state-selected":"",
									onclick: function(){
										vm.program(program);
										vm.page(0);
										vnode.attrs.onpick();
									}
								},[
									m(".programnav-program-number", m(Numbering, {node: program})),
									m(".programnav-program-title", program.value()),
									//m(".programbar-program-mission", program.mission)
								]);
							}),

						]);
					}) : [],

					(page===1) ? ptrn("program", function(program){
						return m(".programnav-domain",[
							m(".programnav-domain-name", program.value()),
							program("task effort person", function(person){
								//count++;
								return m(".state-selectable.programnav-program", {
									class: (ptrn.compare(vm.person(),person))?"state-selected":"",
									onclick: function(){
										vm.person(person);
										vm.page(1);
										vnode.attrs.onpick();
									}
								},[
									//m(".programnav-program-number", m(Numbering, {node: program})),
									m(".programnav-program-title", person.value()),
									//m(".programbar-program-mission", program.mission)
								]);
							}),

						]);
					}) : [],


				]) : []
			];
		}
	};
};
