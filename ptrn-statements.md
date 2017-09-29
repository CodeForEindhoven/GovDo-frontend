ptrn("effort", function(e){
	ptrn.create("startdate", "_/_/_", function(a){ptrn.relate(e,a);});
	ptrn.create("enddate", "_/_/_", function(a){ptrn.relate(e,a);});
});

ptrn("person", function(e){
	ptrn.create("role", "leader", function(a){ptrn.relate(e,a);});
});
