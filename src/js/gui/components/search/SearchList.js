var SearchList = function(){
	function highlight(string, value){
		var splitpoint = string.toLowerCase().indexOf(value);

		return [
			m("span", string.slice(0, splitpoint)),
			m("span.search-result-highlight", string.slice(splitpoint, splitpoint+value.length)),
			m("span", string.slice(splitpoint+value.length)),
		];
	}

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
								m(".searchlist-result-effort", highlight(c.name, vnode.attrs.value)) // Inspanningen
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
