var ProgramBar = function(){
	Models.Program.loadContent();

	return {
		view: function(vnode){
			var count = 1;
			return m(".programbar",[
				Models.Program.getContent().map(function(domain){
					return m(".programbar-domain",[
						domain.Programs.map(function(program){
							return m(".programbar-program", [
								m(".programbar-program-number.button-number", count++),
								m(".programbar-program-title", program.name)
							]);
						})
					]);
				})
			]);
		}
	};
};
