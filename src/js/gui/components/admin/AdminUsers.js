var AdminUsers = function(){
	return {
		view: function(vnode){
			return vm.person() ? m(".personal-efforts",{
				onscroll: function(e){
					vnode.attrs.onscroll(e.target.scrollTop);
				}
			},[
				vm.person()("effort", function(effort){
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
									console.log(effort("task").value());
									vm.program(effort("task")("program"));
									vm.task(effort("task"));
									vm.effort(effort);
									vm.page(0);
								}
							}, m(Icon, {name: "general"})),

							m(".personal-efforts-view", {
								onclick: function(){
									console.log(effort("task").value());
									vm.program(effort("task")("program"));
									vm.task(effort("task"));
									vm.effort(effort);
									vm.page(0);
								}
							}, m(Icon, {name: "programma"})),

							m(".personal-efforts-view", {
								onclick: function(){
									console.log(effort("task").value());
									vm.program(effort("task")("program"));
									vm.task(effort("task"));
									vm.effort(effort);
									vm.page(0);
								}
							}, m(Icon, {name: "kalendar"})),
						]),
					]);
				})
			]) : [];
		}
	};
};
