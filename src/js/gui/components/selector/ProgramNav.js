var ProgramNav = function(){
	//Models.Program.loadContent();
	//viewModels.Hierarchy.updateProgram(1);

	var state = true;

	function selected(id){
		return (viewModel.currentProgram && (viewModel.currentProgram.id() === id));
	}

	//function currentProgram(){
	//	//reduce domains to programs
	//	var list = Models.Program.getContent().reduce(function(acc, curr){
	//		return acc.concat(curr.Programs);
	//	},[])
	//	.map(function(program,count){
	//		program.count = count+1;
	//		return program;
	//	})
	//	.filter(function(program){
	//		return program.id === viewModels.Hierarchy.getProgram();
	//	});

	//	if(list.length > 0 ){
	//		return list[0];
	//	}
	//	return {};
	//}

	return {
		view: function(vnode){
			return m(".programnav", {},[
				m(".programnav-topbar.state-selected",{
					onclick: function(){
						state = !state;
					}
				},[
					viewModel.currentProgram ? [
						m(".programnav-program-number.button-number", viewModel.currentProgram("order").value()),
						m(".programnav-program-title-top", viewModel.currentProgram.value())
					] : [],
					m("i.material-icons.programnav-dropdown", state ? "arrow_drop_up" : "arrow_drop_down"),
				]),
				state ? m(".programnav-popup", {},[
					ptrn("domain", function(domain){
						return m(".programnav-domain",[
							m(".programnav-domain-name", domain.value()),
							domain("program", function(program){
								//count++;
								return m(".state-selectable.programnav-program", {
									class: (selected(program.id()))?"state-selected":"",
									onclick: function(){
										viewModel.currentProgram = program;
										state = false;
									}
								},[
									m(".programnav-program-number.button-number", program("order").value()),
									m(".programnav-program-title", program.value()),
									//m(".programbar-program-mission", program.mission)
								]);
							})
						]);
					})
				]) : []
			]);
		}
	};
};
