var PersonalEfforts = function(){
	return {
		view: function(vnode){
			return vm.person() ? m(".personal-efforts",[
				vm.person()("effort", function(effort){
					return m(".personal-efforts-effort-name", effort.value());
				})
			]) : [];
		}
	};
};
