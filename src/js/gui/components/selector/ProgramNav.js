var ProgramNav = function(){
	Models.Program.loadContent();
	viewModels.Hierarchy.updateProgram(1);

	var state = false;

	function selected(id){
		return (viewModels.Hierarchy.getProgram() === id);
	}

	function currentProgram(){
		//reduce domains to programs
		var list = Models.Program.getContent().reduce(function(acc, curr){
			return acc.concat(curr.Programs);
		},[])
		.map(function(program,count){
			program.count = count+1;
			return program;
		})
		.filter(function(program){
			return program.id === viewModels.Hierarchy.getProgram();
		});

		if(list.length > 0 ){
			return list[0];
		}
		return {};
	}

	return {
		view: function(vnode){
			var p = currentProgram();
			var count = 0;

			return m(".programnav", {},[
				m(".programnav-topbar.state-selected",{
					onclick: function(){
						state = !state;
					}
				},[
					m(".programnav-program-number.button-number", p.count),
					//m(".programnav-program-title-top", viewModel.currentProgram.value()),
					m("i.material-icons.programnav-dropdown", state ? "arrow_drop_up" : "arrow_drop_down"),
				]),
				state ? m(".programnav-popup", {},[
					ptrn("domain", function(domain){
						return m(".programnav-domain",[
							m(".programnav-domain-name", domain.value()),
							domain("program", function(program){
								count++;
								return m(".state-selectable.programnav-program", {
							//		class: (selected(program.id()))?"state-selected":"",
							//		onclick: function(){
							//			//viewModels.Hierarchy.updateProgram(program.id());
							//			viewModel.currentProgram = program;
							//			state = false;
							//		}
								},[
									m(".programnav-program-number.button-number", count),
									m(".programnav-program-title", program.value()),
							//		//m(".programbar-program-mission", program.mission)
								]);
							})
						]);
					})
				]) : []
			]);
		}
	};
};
