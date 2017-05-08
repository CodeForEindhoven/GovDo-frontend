var Effort = function(){

	var types = [
		"Project",
		"Programma",
		"Routine",
		"Proces",
		"Improvisatie",
		"Klusje"
	];

	return {
		view: function(vnode){
			if(viewModels.Hierarchy.getTask()>0){
				return m(".half",[
					m(List, {
						title:"Inspanningen",
						selected: viewModels.Hierarchy.getEffort(),
						content: Models.Effort.getContent().map(function(e){
							var type = "geen";
							if(e.type>-1){
								type = types[e.type];
							}


							e.subcontent = [
								m(".header", "type"),
								m("", type),
								m(".header", "mensen"),
								e.People.map(function(p){
									return m("", p.name);
								})
							];
							return e;
						}),
						onclick: function(id){
							viewModels.Hierarchy.updateEffort(id);
							shiftViewer(2);
						},
						onadd: function(name){
							Models.Effort.newItem(name, function(id){
								viewModels.Hierarchy.updateEffort(id);
								shiftViewer(2);
							});
						}
					})
				])
			}
		}
	};
};
