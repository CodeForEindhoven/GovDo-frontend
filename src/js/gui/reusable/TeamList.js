var TeamList = function(){

	Models.Person.loadTeams();

	return {
		view: function(vnode){
			return m(".personlist", Models.Person.getTeams().map(function(t){
				return m(".personlist-team",{
					oncreate: function(vnode){
						if(t.id === viewModels.Hierarchy.getProgram()){
							vnode.dom.scrollIntoView(true);
						}
					}
				},[
					m(".personlist-teamname", t.name),
					t.People.map(function(p){
						return m(".personlist-person",{
							onclick: function(){
								vnode.attrs.onadd(p);
							}
						}, [
							p.name,
							m("i.material-icons .person-list-add-button", "add"),
						]);
						
					})
				]);
			}));
		}
	};
};
