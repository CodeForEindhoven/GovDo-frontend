var Viewer = function(){
	return {
		view: function(vnode){
			return m(".page#page",[
				m(".back", {
					onclick: function(){
						document.getElementById("page").scrollBy({ top: 0, left: -(window.innerWidth/2), behavior: 'smooth' });
					}
				}, "<"),
				m(Program),
				m(Task),
				m(Effort)
				//m(Task,    			{selected: currentTask, 	onselect: updateTask, 		view: currentProgram 	}),
				//m(Effort,  			{selected: currentEffort, 	onselect: updateEffort,		view: currentTask		}),
				//m(EffortDetails,  	{							onselect: updateEffort,		view: currentEffort		,display: (currentTask>0)}),
			]);
		}
	};
};

function shiftViewer(to){
	document.getElementById("page").scroll({ top: 0, left: to*(window.innerWidth/2), behavior: 'smooth' });
}
