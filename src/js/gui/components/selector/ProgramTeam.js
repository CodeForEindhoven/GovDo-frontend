var ProgramTeam = function(){


	return {
		view: function(vnode){
			var leader = vm.program()("role:leader person");
			return m(".teamlist",[
				m(".selector-header", [
					m("span", "Team"),
				]),[
					m(".teamlist-person.teamlist-person-leader",[
						m("span.teamlist-person-name", leader.value()),
						m("span.teamlist-person-icons", [m(NavWidget, {node: leader})])
					]),
					vm.program()("task effort person", function(person){
						return m(".teamlist-person",[
							m("span.teamlist-person-name", person.value()),
							m("span.teamlist-person-icons", [m(NavWidget, {node: person})])
						]);
					})
				]
				//ptrn.compare(vm.program()("role:leader person"), person)
				//.emptyState(
				//	m(".selectorlist-emptystate",[
				//		m(".selectorlist-emptystate-message-header", "Helemaal alleen? 😭"),
				//		m(".selectorlist-emptystate-message", [m("em",vm.program().value())," heeft nog geen team."]),
				//		m(".selectorlist-emptystate-message", ["Begin inspanningen toe te voegen om een team te vormen"]),
				//	])
				//)
			]);
		}
	};
};
