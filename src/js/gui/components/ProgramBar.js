var ProgramBar = function(){
	Models.Program.loadContent();

	function selected(id){
		return (viewModels.Hierarchy.getProgram() === id);
	}

	return {
		view: function(vnode){
			var count = 0;
			return m(".programbar",[
				Models.Program.getContent().map(function(domain){
					return m(".programbar-domain",[
						domain.Programs.map(function(program){
							count++;
							return m(".programbar-program", {
								class: (selected(program.id))?"state-selected":"",
								onclick: function(){
									viewModels.Hierarchy.updateProgram(program.id, program.name);
								}
							},[
								m(".programbar-program-number.button-number", count),
								m(".programbar-program-title", program.name),
								m(".programbar-program-mission", (selected(program.id))?program.mission:"")
							]);
						})
					]);
				})
			]);
		}
	};
};
