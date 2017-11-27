var Editor = function(){
	return {
		view: function(vnode){
			return m(".editor",{
				class: (vm.edit() ? "state-edit": "state-hidden") + " " + ((vm.edit() && vm.edit().type()==="effort") ? "editor-right": "editor-left")
			}, [
				//Header
				m(".editor-header",[
					vm.edit() ? m(Numbering, {node: vm.edit()}) : [],
					m("span", "Editor"),
					m(".icons-header .close-button", {
						onclick: function(){
							ptrn.transact();
							if(vm.edit().type()==="effort"){
								vm.effort(vm.edit());
							} else if(vm.edit().type()==="task"){
								vm.task(vm.task());
							} else if(vm.edit().type()==="program"){
								vm.program(vm.program());
							}
							vm.editClose();
						}
					}, [
//						m(".save-button", (viewModels.editMode.savingState())?"Opslaan...":"Opslaan"),
						m("i.material-icons", "close"),
					]),
				]),

				//Content
				(function(){
					if(vm.edit()) {
						return m(".editor-content",{
							onbeforeremove: function(){
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
								}
							})(),

							m(".editor-buttons",[

	//							// Save button
	//							m(".save-button", {
	//								onclick: function(){
	//									ptrn.transact();
	//								}
	//							},(/*viewModels.editMode.savingState()*/false)?"Opslaan...":"Opslaan"),

								//Delete item
								m(".button-delete", {
									onclick: function(){
										if (confirm("Weet je zeker dat je '"+vm.edit().value()+"' wil verwijderen?") === true) {
											vm.edit().drop();
											vm.editClose();
											ptrn.transact();
										}
									}
								},"Verwijder"),
							]),
						]);
					}
					return [];
				})(),
			]);
		}
	};
};
