var ProgramTeam = function(){

	return {
		view: function(vnode){
			return m(".teamlist",[
				vm.program()("task effort person", function(person){
					return m(".teamlist-person",[
						m("span.teamlist-person-name", person.value()),
						m("span.teamlist-person-icons", [m(NavWidget, {node: person})])
					]);
				})
			]);
		}
	};
};
