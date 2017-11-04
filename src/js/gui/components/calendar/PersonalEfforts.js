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
					return m(".personal-efforts-effort", [
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
							m(".personal-efforts-view", {
								onclick: function(){
									vm.program(effort("task")("program"));
									vm.task(effort("task"));
									vm.effort(effort);
									vm.focus(effort);
									vm.page(0);
								}
							}, m(Icon, {name: "general-small"})),

							m(".personal-efforts-view", {
								onclick: function(){
									vm.program(effort("task")("program"));
									vm.task(effort("task"));
									vm.effort(effort);
									vm.focus(effort);
									vm.page(0);
								}
							}, m(Icon, {name: "programma-small"})),

							m(".personal-efforts-view", {
								onclick: function(){
									vm.program(effort("task")("program"));
									vm.task(effort("task"));
									vm.effort(effort);
									vm.focus(effort);
									vm.page(1);
								}
							}, m(Icon, {name: "kalendar-small"})),
						]),
					]);
				})
			]) : [];
		}
	};
};
