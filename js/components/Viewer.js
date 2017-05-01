var Viewer = function(){

	var currentProgram = -1;
	function updateProgram(p){
		currentProgram = p;
	}

	var currentTask = -1;
	function updateTask(p){
		console.log(p);
		currentTask = p;
	}

	var currentEffort = -1;
	function updateEffort(p){
		console.log(p);
		currentEffort = p;
	}

	return {
		view: function(vnode){
			return m(".page#page",[
				m(".back", {
					onclick: function(){
						document.getElementById("page").scrollBy({ top: 0, left: -(window.innerWidth/2), behavior: 'smooth' });
					}
				}, "<"),
				m(Program, 			{selected: currentProgram, 	onselect: updateProgram 							}),
				m(Task,    			{selected: currentTask, 	onselect: updateTask, 		view: currentProgram, 	}),
				m(Effort,  			{selected: currentEffort, 	onselect: updateEffort,		view: currentTask		}),
				m(EffortDetails,  	{							onselect: updateEffort,		view: currentEffort		}),
			]);
		}
	};
};

function shiftViewer(to){
	document.getElementById("page").scroll({ top: 0, left: to*(window.innerWidth/2), behavior: 'smooth' });
}
