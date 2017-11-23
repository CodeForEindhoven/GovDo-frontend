var GeneralStatus = function(){

	function getFeedbacks(){


		return ptrn("feedbacksession", function(session){
			var values = ptrn("feedback:"+session.value(), function(feedback){
				return [
					feedback("effects").value(),
					feedback("products").value(),
					feedback("planning").value(),
					feedback("stakeholders").value(),
					feedback("conditions").value(),
				].reduce(function(mp, e){
					if(!mp[e]){mp[e]=0;}
					mp[e]++;
					return mp;
				},{});
			}).reduce(function(mp, e){
				for(var i in e){
					if(!mp[i]){mp[i]=0;}
					mp[i]+=e[i];
				}
				return mp;
			},{0:0,1:0,2:0,"":0});

			return {
				name: session.value(),
				totals: (values[0]||0)+(values[1]||0)+(values[2]||0)+(values[""]||0),
				values: values
			};
		});
	}

	return {
		view: function(vnode){
			return m(".dashboard-feedbacks", [
				ptrn("program", function(program){
					return m(".dashboard-general-program", [
						m(".dashboard-general-program-name", program.value()),
						m(".dashboard-general-tasks", program("task", function(task){
							return m(".dashboard-general-task",[
								m(".dashboard-general-task-number",task("order").value()),
								task("effort", function(effort){
									return m(".dashboard-general-effort",effort("order").value());
								})
							]);
						}))
					]);
				})
			]);
		}
	};
};
