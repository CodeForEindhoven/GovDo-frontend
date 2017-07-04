var TeamList = function(){

	Models.Person.loadTeams();

	return {
		view: function(vnode){
			return m(".PersonList", Models.Person.getTeams().map(function(t){
				return m(".team",{
					oncreate: function(vnode){
						if(t.id === viewModels.Hierarchy.getProgram()){
							vnode.dom.scrollIntoView(true);
						}
					}
				},[
					m(".name", t.name),
					t.People.map(function(p){
						return m(".person",{
							onclick: function(){
								vnode.attrs.onadd(p);
							}
						}, p.name);
					})
				]);
			}));
		}
	};
};
