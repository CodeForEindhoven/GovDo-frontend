var SearchList = function(){
	return {
		view: function(vnode){
			return m(".searchlist", [
				Models.Search.getContent().map(function(c){
					if(c.type==="effort"){
						return m(".searchlist-result", {
							onclick: function(){
								vnode.attrs.onfind();
								viewModels.Hierarchy.jumpTo(c.program.id, c.task.id, c.id);
							}
						},[
								m(".searchlist-result-program", c.program.name), // Programma
								m(".searchlist-result-effort", c.name) // Inspanningen
						]);
					} else if(c.type==="task") {
						return m(".searchlist-result", {
							onclick: function(){
								vnode.attrs.onfind();
								viewModels.Hierarchy.jumpTo(c.program.id, c.id);
							}
						},[
								m(".searchlist-result-program", c.program.name), // Programma
								m(".searchlist-result-effort", c.name) // Inspanningen
						]);
					}
				})
			]);
		}
	};
};
