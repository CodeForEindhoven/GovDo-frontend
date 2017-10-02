var PersonalEfforts = function(){
	return {
		view: function(vnode){
			return vm.person() ? m(".personal-efforts",[
				vm.person()("effort", function(effort){
					return m(".personal-efforts-effort", [
						m(Numbering, {node: effort, whole: true}),
						m(".personal-efforts-effort-name", effort.value()),
						m(".personal-efforts-effort-type", emptyState(viewModels.typeNames[effort("type").value()], m(".effortselector-type-state.state-empty", "Nog geen type"))),
					]);
				})
			]) : [];
		}
	};
};
