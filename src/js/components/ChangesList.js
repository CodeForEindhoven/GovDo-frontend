var ChangesList = function(){

	Models.Changes.loadContent();

	return {
		view: function(vnode){
			return m(".ChangesList", [
				Models.Changes.getContent().map(function(c){
					return m(".change", [
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
