var API_VERSION = "0.2.0";

//check for major updates
ptrn.loadall(function(){
	m.route(document.body, "/", {
		"/": Page,
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
