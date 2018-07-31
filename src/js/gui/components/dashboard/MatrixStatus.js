var MatrixStatus = function(){

	return {
		view: function(vnode){
			return m(".dashboard-feedbacks", [
				m(".dashboard-general-top", ptrn("program", function(program){
					return m(".dashboard-general-program-top", [
						m(".dashboard-general-program-top-name", program("order").value()+ ". "+ program.value())
					]);
				})),
				m(".dashboard-general-bottom", ptrn("program", function(program){
					return m(".dashboard-general-program", [
						m(".dashboard-general-program-name", program("order").value()+ ". "+program.value()),
						m(".dashboard-general-tasks", program("task", function(t){return t;}).sort(function(a,b){
							return parseInt(a("order").value()) - parseInt(b("order").value());
						}).map(function(task){
							return m(".dashboard-matrix-task",[
								m(".dashboard-matrix-task-number",task("order").value()),
								ptrn("program", function(other){
									return m(".dashboard-matrix-task-program", [
										task("related effort", function(e){return e;}).filter(function(e){
											return ptrn.compare(other, e("task program"));
										}).map(function(effort){
											return m(".dashboard-matrix-task-program-effort", {
												title: effort.value(),
												onclick: function(){
													vm.program(program);
													vm.task(task);
													vm.effort(effort);
													vm.focus(vm.program());
													vm.page(0);
												}
											}, effort("task order").value()+"."+effort("order").value());
										})
									]);
								})
							]);
						}))
					]);
				}))
			]);
		}
	};
};
