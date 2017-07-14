var SearchList = function(){

	Models.Search.loadContent();

	function getFilterdContent(value){
		return Models.Search.getContent().filter(function(p){
			return (p.name.toLowerCase().indexOf(value.toLowerCase())>-1);
		});
	}

	return {
		view: function(vnode){
			return m(".searchlist", [
				getFilterdContent(vnode.attrs.value).map(function(c){
					return m(".searchlist-result", {
						onclick: function(){
							vnode.attrs.onfind();
							viewModels.Hierarchy.jumpTo(c.Tasks[0].Programs[0].id, c.Tasks[0].id, c.id);
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
