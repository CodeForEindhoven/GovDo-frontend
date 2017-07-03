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
