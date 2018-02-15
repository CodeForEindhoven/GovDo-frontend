var Editor = function(){
	var scrollstore = 0;
	return {
		view: function(vnode){
			return m(".editor",{
				class: (vm.edit() ? "state-edit": "state-hidden") + " " + ((vm.edit() && vm.edit().type()!=="effort") ? "editor-left": "editor-right")
			}, [
				//Header
				vm.edit() ? m(".editor-header",[
					m(Numbering, {node: vm.edit()}),
					m("span", [
						(vm.edit().type()==="effort") ? "Inspanning Editor" : [],
						(vm.edit().type()==="task") ? "Opgave Editor" :  [],
						(vm.edit().type()==="program") ? "Programma Editor" : [],
						(vm.edit().type()==="person") ? "Gebruiker Editor" : []
					]),


					m(".icons-header", [
						m(".button", {
							onclick: function(){
								ptrn.transact();
								if(vm.edit().type()==="effort"){
									vm.effort(vm.edit());
								} else if(vm.edit().type()==="task"){
									vm.task(vm.edit());
								} else if(vm.edit().type()==="program"){
									vm.program(vm.edit());
								}
								vm.editClose();
							}
						}, [
							"Opslaan"
						]),

						//close don't save
						m(".close-button.icon-button", {
							onclick: function(){
								var close = true;
								if(ptrn.hasSpeculations()){
									if (confirm("Wijzigingen niet opslaan?") === true) {
										ptrn.unSpeculate();
									} else {
										close = false;
									}
								}

								if(close){
									if(vm.edit().type()==="effort"){
										vm.effort(vm.edit());
									} else if(vm.edit().type()==="task"){
										vm.task(vm.edit());
									} else if(vm.edit().type()==="program"){
										vm.program(vm.edit());
									}
									vm.editClose();
								}
							}
						}, [
							m("span.icon-button-hint", "Wijzigingen annuleren"),
							m("i.material-icons", "close"),
						]),
					])
				]) : [],

				//Content
				(function(){
					if(vm.edit()) {
						return m(".editor-content",{
							//onbeforeupdate: function(vnode, old){
							//	scrollstore = old.dom.scrollTop;
							//	console.log("scrollstore", scrollstore);
							//},
							//onupdate: function(vnode){
							//	//vnode.dom.scrollTop = scrollstore;
							//},
							onbeforeremove: function(vnode){
								return new Promise(function(resolve) {
									setTimeout(resolve, 400);
								});
							}
						},[
							(function(){
								if(vm.edit().type()==="effort"){
									return m(EffortEditor);
								} else if(vm.edit().type()==="task"){
									return m(TaskEditor);
								} else if(vm.edit().type()==="program"){
									return m(ProgramEditor);
								} else if(vm.edit().type()==="person"){
									return m(UserEditor);
								}
							})(),

	//						m(".editor-buttons",[

	//							// Save button
	//							m(".save-button", {
	//								onclick: function(){
	//									ptrn.transact();
	//								}
	//							},(/*viewModels.editMode.savingState()*/false)?"Opslaan...":"Opslaan"),

								//Delete item
								(vm.edit().type()==="task" || vm.edit().type()==="effort") ? m(".button-delete", {
									onclick: function(){
										if (confirm("Weet je zeker dat je '"+vm.edit().value()+"' wil verwijderen?") === true) {

											var parent;
											if(vm.edit().type()==="task"){
												parent = vm.edit()("program");
												vm.edit().drop();
												parent("task", function(t){
													return t;
												}).sort(function(a,b){
													return parseInt(a("order").value()) - parseInt(b("order").value());
												}).map(function(t,c){
													console.log(t("order").update(c+1));
												});
											}

											if(vm.edit().type()==="effort"){
												parent = vm.edit()("task");
												vm.edit().drop();
												parent("effort", function(t){
													return t;
												}).sort(function(a,b){
													return parseInt(a("order").value()) - parseInt(b("order").value());
												}).map(function(t,c){
													console.log(t("order").update(c+1));
												});
											}

											vm.editClose();
											ptrn.transact();
										}
									}
								},"Verwijder") : [],
							]),
						]);
					}
					return [];
				})(),
			]);
		}
	};
};
