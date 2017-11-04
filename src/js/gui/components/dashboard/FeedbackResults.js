var FeedbackResults = function(){

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
				getFeedbacks().map(function(session){
					return m(".dashboard-feedbacks-session",[
						m(".dashboard-feedbacks-session-name",session.name),
						m(".dashboard-feedbacks-session-values",[
							(session.values[0] > 0) ? m(".dashboard-feedbacks-session-value.feedback-color-a",{style: "height:"+((session.values[0]/session.totals)*100)+"%;"}, m(Icon, {name: "feedback-top-small"})) : [],
							(session.values[1] > 0) ? m(".dashboard-feedbacks-session-value.feedback-color-b",{style: "height:"+((session.values[1]/session.totals)*100)+"%;"}, m(Icon, {name: "feedback-middle-small"})) : [],
							(session.values[2] > 0) ? m(".dashboard-feedbacks-session-value.feedback-color-c",{style: "height:"+((session.values[2]/session.totals)*100)+"%;"}, m(Icon, {name: "feedback-low-small"})) : [],
							(session.values[""] > 0) ? m(".dashboard-feedbacks-session-value.feedback-color-d",{style: "height:"+((session.values[""]/session.totals)*100)+"%;"},"-") : [],
						]),
					]);
				})
			]);
		}
	};
};
