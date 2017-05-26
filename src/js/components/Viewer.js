var Viewer = function(){
	return {
		view: function(vnode){
			return m(".viewer#viewer",[
				m(Program),
				m(Task),
				m(Effort)
			]);
		}
	};
};

function shiftViewer(to){
	document.getElementById("viewer").scroll({ top: 0, left: to*(window.innerWidth/2), behavior: 'smooth' });
}
