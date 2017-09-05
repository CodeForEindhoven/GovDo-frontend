var ProgramNav = function(){
	Models.Program.loadContent();
	viewModels.Hierarchy.updateProgram(2);
	function selected(id){
		return (viewModels.Hierarchy.getProgram() === id);
	}

	function shortname(str){
		return str.replace(/ en /g, ' & ').replace(/[a-z ]/g, '');
	}

	function currentProgram(){
		//reduce domains to programs
		var list = Models.Program.getContent().reduce(function(acc, curr){
			return acc.concat(curr.Programs);
		},[])
		.map(function(program,count){
			program.count = count;
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
			return m(".programnav", [
				m(".programnav-program-number.button-number", p.count),
				m(".programnav-program-title", p.name),
			]);
		}
	};
};
