var MissionVision = function(){

	return {
		view: function(vnode){
			return m(".mission",[
				m(".mission-title", "Missie"),
				m(".mission-mission body-text", vm.program()("mission").value()),
			])
		}
	};
};
