var API_VERSION = "0.2.0";


var MagicLogin = function(){
	var checked = false;
	return {
		view: function(vnode){
			if(!checked){
				checked = true;
				var hash = location.hash.split("?");
				var username = hash[1];
				var password = hash[2];

				ptrn.loginpass(username, password, function(succes, node, role, token){
					if(succes){
						vm.login(0);
						vm.user({
							user:username,
							node: node,
							role: role,
							token: token
						});
						ptrn.onload(function(){
							vm.person(ptrn("person"));
							m.route.set("/");
						});
					} else {
						m.route.set("/");
					}
				});
			}
			return m(".magic-login", "Inloggen...");
		}
	};
};

function loadgui(){
	m.route(document.body, "/", {
		"/": Page,
		"/magic": MagicLogin,
		"/help": HelpPage
	});
}



/*
function cheatToCalendar(){
	vm.program(ptrn("program"));
	vm.person(ptrn("person"));
	vm.page(1);
	m.redraw();
}

function cheatToEditor(){
	vm.login(0);
	vm.program(ptrn("program"));
	vm.task(ptrn("program task"));
	vm.effort(ptrn("program task effort"));
	vm.edit(vm.effort());
	vm.page(0);
	m.redraw();
}

function cheatToLogin(){
	vm.login(1);
	m.redraw();
}
*/
