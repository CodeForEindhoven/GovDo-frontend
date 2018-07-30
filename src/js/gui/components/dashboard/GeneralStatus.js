var GeneralStatus = function(){
	return {
		view: function(vnode){
			return m(".dashboard-feedbacks", [
				ptrn("program", function(program){
					return m(".dashboard-general-program", [
						m(".dashboard-general-program-name", {
							onclick: function(){
								vm.program(program);
								vm.focus(program);
								vm.page(0);
							}
						},program.value()),
						m(".dashboard-general-tasks", program("task", function(t){return t;}).sort(function(a,b){
							return parseInt(a("order").value()) - parseInt(b("order").value());
						}).map(function(task){
							return m(".dashboard-general-task",[
								m(".dashboard-general-task-number",{
									onclick: function(){
										vm.program(task("program"));
										vm.task(task);
										vm.focus(vm.program());
										vm.page(0);
									}
								},task("order").value()),
								task("effort", function(e){return e;}).sort(function(a,b){
									return parseInt(a("order").value()) - parseInt(b("order").value());
								}).map(function(effort){
									return m(".dashboard-general-effort",{
										class: effort('mode').value()==-1?"mode-sketch":"" + " " + effort('mode').value()==-2?"mode-ready":"",
										onclick: function(){
											vm.program(effort("task program"));
											vm.task(effort("task"));
											vm.effort(effort);
											vm.focus(vm.program());
											vm.page(0);
										}
									},effort("order").value());
								})
							]);
						}))
					]);
				})
			]);
		}
	};
};
