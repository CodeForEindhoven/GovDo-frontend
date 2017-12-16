var TeamList = function(){

	return {
		view: function(vnode){
			return m(".personlist", ptrn("program", function(team){
				return m(".personlist-team",{
					oncreate: function(t){
							return function(vnode){
								if(ptrn.compare(vm.program(), team)){
									//console.log(team.value());
									var offset = vnode.dom.offsetTop;
									vnode.dom.parentNode.scrollTop = offset;
								}
							};
					}(team) //focus onto current team;
				},[
					m(".personlist-teamname", team.value()),
					team("task effort person", function(person){
						return m(".personlist-person.item-list",{
							onclick: function(){
								vnode.attrs.onadd(person);
							}
						}, [
							person.value(),
							m("i.material-icons .person-list-add-button", "add"),
						]);
					}).emptyState(m(".personlist-team-emptystate.state-empty", "nog geen toegewezen team"))
				]);
			}));
		}
	};
};
