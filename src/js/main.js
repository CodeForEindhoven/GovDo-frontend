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

				ptrn.loginpass(username, password, function(succes, node, role){
					if(succes){
						vm.login(0);
						vm.user({
							user:username,
							pass:password,
							node: node,
							role: role
						});
						location.href = "/";
					}

				});
			}


			return m(".magic-login", "Inloggen...");
		}
	};
};

//check for major updates
ptrn.onload(function(){
	vm.program(ptrn("program"));
	vm.person(ptrn("person"));
	vm.focus(vm.program());

	m.route(document.body, "/", {
		"/": Page,
		"/magic": MagicLogin
	});
});

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
