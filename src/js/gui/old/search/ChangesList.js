var ChangesList = function(){

	Models.Changes.loadContent();

	return {
		view: function(vnode){
			return m(".changeslist", [
				Models.Changes.getContent().map(function(c){
					return m(".changeslist-change", {
						onclick: function(){
							vnode.attrs.onfind();
							viewModels.Hierarchy.jumpTo(c.Tasks[0].Programs[0].id, c.Tasks[0].id, c.id);
						}
					},[
						m(".changeslist-change-first-line",[
							m(".changeslist-change-program", c.program),
							m(".changeslist-change-name", c.name),
						]),

						m(".changeslist-change-second-line",[
						m(".changeslist-change-date", c.date+ " geleden"),
						m(".changeslist-change-type", (c.new?"nieuw":"aangepast")),
						]),
					]);
				})
			]);
		}
	};
};
