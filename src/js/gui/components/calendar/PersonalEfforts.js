var PersonalEfforts = function(){

	function selection(callback){
		if(vm.focus().type()==="program"){
			return vm.program()("task effort", callback);

		} else if(vm.focus().type()==="task"){
			return vm.task()("effort", callback);

		} else if(vm.focus().type()==="effort"){
			return vm.effort()("person", callback);

		} else if(vm.focus().type()==="person"){
			return vm.person()("effort", callback);
		}
	}

	return {
		view: function(vnode){
			return vm.person() ? m(".personal-efforts",{
				onscroll: function(e){
					vnode.attrs.onscroll(e.target.scrollTop);
				}
			},[
				selection(function(effort){
					return (vm.focus().type()==="effort") ?
					m(".personal-efforts-effort", [
						m(".personal-efforts-effort-details", [
							m(".personal-efforts-effort-name", effort.value()),
							//m(".personal-efforts-effort-type", emptyState(viewModels.typeNames[effort("type").value()], m(".effortselector-type-state.state-empty", "Nog geen type"))),
							m(NavWidget, {node: effort})
						]),
					])
					:
					m(".personal-efforts-effort", [
						m(Numbering, {node: effort, whole: true, disabled: (effort("startdate").value()==="_/_/_")}),
						m(".personal-efforts-effort-details", [
							m(".personal-efforts-effort-name", effort.value()),
							m(".personal-efforts-effort-date", [
								m("span", "van"),
								m(DateDisplay, {date: effort("startdate").value()}),
								m("span", "t/m"),
								m(DateDisplay, {date: effort("enddate").value()}),
							]),
							m(".personal-efforts-effort-type", emptyState(viewModels.typeNames[effort("type").value()], m(".effortselector-type-state.state-empty", "Nog geen type"))),
							m(NavWidget, {node: effort})
						]),
					]);
				})
			]) : [];
		}
	};
};
