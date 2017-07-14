var SearchList = function(){
	return {
		view: function(vnode){
			return m(".searchlist", [
				Models.Search.getContent().map(function(c){
					return m(".searchlist-result", {
						onclick: function(){
							vnode.attrs.onfind();
							viewModels.Hierarchy.jumpTo(c.Tasks[0].Programs[0].id, c.Tasks[0].Programs[0], c.Tasks[0].id, c.id);
						}
					},[
							m(".searchlist-result-program", c.program), // Programma
							m(".searchlist-result-effort", c.name) // Inspanningen

//						m(".searchlist-results-first-line",[
//							m(".searchlist-result-program", c.program), // Programma
//							m(".searchlist-result-task", c.task), // Opgaven
//						]),
						
//						m(".searchlist-results-second-line",[
//							m(".searchlist-result-effort", c.name) // Inspanningen
//						]),
						
					]);
				})
			]);
		}
	};
};
