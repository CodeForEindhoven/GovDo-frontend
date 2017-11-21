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
					m(".personal-efforts-effort.state-selectable", [
						m(".personal-efforts-effort-details", [
							m(".personal-efforts-effort-name", effort.value()),
							//m(".personal-efforts-effort-type", emptyState(viewModels.typeNames[effort("type").value()], m(".effortselector-type-state.state-empty", "Nog geen type"))),
							m(NavWidget, {node: effort})
						]),
					])
					:
					m(".personal-efforts-effort.state-selectable", [
						m(Numbering, {node: effort, whole: true, disabled: (effort("startdate").value()==="_/_/_")}),
						m(".personal-efforts-effort-details", [
							m(".personal-efforts-effort-name", effort.value()),
							m(".personal-efforts-effort-date", [
								m("span", "van"),
								m(DateDisplay, {
									onclick: function(date){
										vnode.attrs.setDate(date[0]);
									},
									date: effort("startdate").value()
								}),
								m("span", "t/m"),
								m(DateDisplay, {
									onclick: function(date){
										var d = date[0];
										if(date[1]){ d = date[1]; }
										vnode.attrs.setDate(d);
									},
									date: effort("enddate").value()
								}),
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
