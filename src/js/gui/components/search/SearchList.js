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
						m(".searchlist-result-program", c.program),
						m(".searchlist-result-task", c.task),
						m(".searchlist-result-effort", c.name)
					]);
				})
			]);
		}
	};
};
