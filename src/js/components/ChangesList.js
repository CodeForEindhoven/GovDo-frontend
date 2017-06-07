var ChangesList = function(){

	Models.Changes.loadContent();

	return {
		view: function(vnode){
			return m(".ChangesList", [
				Models.Changes.getContent().map(function(c){
					return m(".change", {
						onclick: function(){
							vnode.attrs.onfind();
							viewModels.Hierarchy.jumpTo(c.Tasks[0].Programs[0].id, c.Tasks[0].id, c.id);
						}
					},[
						m(".new", (c.new?"nieuw":"aangepast")),
						m(".date", c.date+ " geleden"),
						m(".program", c.program),
						m(".change", c.name)
					]);
				})
			]);
		}
	};
};
