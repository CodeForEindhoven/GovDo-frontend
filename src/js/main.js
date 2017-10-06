var API_VERSION = "0.2.0";

//check for major updates
ptrn.loadall(function(){
	m.route(document.body, "/", {
		"/": Page,
	});
});


function cheatToCalendar(){
	vm.program(ptrn("program"));vm.person(ptrn("person"));vm.page(1);m.redraw();
}
