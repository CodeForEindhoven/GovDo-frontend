var ProgramBar = function(){
	Models.Program.loadContent();

	function selected(id){
		return (viewModels.Hierarchy.getProgram() === id);
	}

	function shortname(str){
		return str.replace(/ en /g, ' & ').replace(/[a-z ]/g, '');
	}

	return {
		view: function(vnode){
			var count = 0;
			return m(".programbar",[
				Models.Program.getContent().map(function(domain){
					return m(".programbar-domain",[
						m(".programbar-domain-name", domain.name),
						domain.Programs.map(function(program){
							count++;
							return m(".state-selectable.programbar-program", {
								class: (selected(program.id))?"state-selected":"",
								onclick: function(){
									viewModels.Hierarchy.updateProgram(program.id, program);
								}
							},[
								m(".programbar-program-number.button-number", shortname(program.name)),
								m(".programbar-program-title", program.name),
								//m(".programbar-program-mission", program.mission)
							]);
						})
					]);
				})
			]);
		}
	};
};
