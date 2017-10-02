var Login = function(){

	var value = "";

	return {
		view: function(vnode){
			return vm.login() ? m(".login",[
				m(".login-overlay-fullscreen"),
				m(".login-popup", "Bonjourr")
			]) : [];
		}
	};
};
