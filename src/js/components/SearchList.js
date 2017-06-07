var SearchList = function(){

	Models.Search.loadContent();

	function getFilterdContent(value){
		return Models.Search.getContent().filter(function(p){
			return (p.name.toLowerCase().indexOf(value.toLowerCase())>-1);
		});
	}

	return {
		view: function(vnode){
			return m(".SearchList", [
				getFilterdContent(vnode.attrs.value).map(function(c){
					return m(".result", {
						onclick: function(){
							vnode.attrs.onfind();
							viewModels.Hierarchy.jumpTo(c.Tasks[0].Programs[0].id, c.Tasks[0].id, c.id);
						}
					},[
						m(".program", c.program),
						m(".task", c.task),
						m(".effort", c.name)
					]);
				})
			]);
		}
	};
};
