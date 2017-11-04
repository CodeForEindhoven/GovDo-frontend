var DropdownNav = function(){
	var page = 0;
	var search = "";

	return {
		view: function(vnode){

			if(search.length>0){
				page = -1;
			} else {
				page = 0;
			}

			return [
				vnode.attrs.state ? m(".programnav-popup", {},[

					m(".programnav-searchbar",[
						m("input",{
							placeholder: "Zoeken naar ...",
							value: search,
							oninput: m.withAttr("value", function(v) {
								search = v;

							})
						}),
					]),

					(page===-1) ? m(".programnav-domain",[
						ptrn("*"+search, function(result){return result;})
						.filter(function(result){
							return (["program", "task", "effort", "person"].indexOf(result.type())>-1);
						})
						.sort(function(a,b){
							var indexA = ["person", "program", "task", "effort"].indexOf(a.type());
							var indexB = ["person", "program", "task", "effort"].indexOf(b.type());
							return indexA-indexB;
						})
						.map(function(result){
							//count++;
							return m(".state-selectable.programnav-searchresult", {
								class: "searchresult-"+result.type(),
								onclick: function(){
									if(result.type()==="program"){
										vm.program(result);
										vm.focus(result);
										vnode.attrs.onpick();
									}
									if(result.type()==="task"){
										vm.program(result("program"));
										vm.task(result);
										vm.focus(result);
										vnode.attrs.onpick();
									}
									if(result.type()==="effort"){
										vm.program(result("task program"));
										vm.task(result("task"));
										vm.effort(result);
										vm.focus(result);
										vnode.attrs.onpick();
									}

									if(result.type()==="person"){
										vm.person(result);
										vm.focus(result);
										vnode.attrs.onpick();
									}

								}
							},[
								m(".programnav-searchresult-number", m(Numbering, {whole: true, node: result})),
								m(".programnav-searchresult-title", result.value()),
								//m(".programbar-program-mission", program.mission)
							]);
						}),

					]) : [],

					(page===0) ? [
						ptrn("domain", function(domain){
							return m(".programnav-domain",[
								m(".programnav-domain-name", domain.value()),
								domain("program", function(program){
									//count++;
									return m(".state-selectable.programnav-program.default", {
										class: (ptrn.compare(vm.program(),program))?"state-selected":"",
										onclick: function(){
											vm.program(program);
											vm.focus(program);
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
						}),

						m(".programnav-domain",[
							m(".programnav-domain-name", "MENSEN"),
							ptrn("person", function(p){return p;})
								.sort(function(a,b){
									var nameA=a.value().toLowerCase(), nameB=b.value().toLowerCase();
									if(nameA < nameB) return -1;
									if(nameA > nameB) return 1;
									return 0;
								})
								.map(function(person){
									return m(".state-selectable.programnav-program", {
										class: (ptrn.compare(vm.person(),person))?"state-selected":"",
										onclick: function(){
											vm.person(person);
											vm.closeall();
											vm.focus(person);
											vnode.attrs.onpick();
										}
									},[
										//m(".programnav-program-number", m(Numbering, {node: program})),
										m(".programnav-program-title", person.value()),
									]);
								})
						])
					] : [],

				]) : []
			];
		}
	};
};
