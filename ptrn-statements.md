ptrn("effort", function(e){
	ptrn.create("startdate", "_/_/_", function(a){ptrn.relate(e,a);});
	ptrn.create("enddate", "_/_/_", function(a){ptrn.relate(e,a);});
});

//
ptrn("person", function(e){
	ptrn.createrelate("role", "leader", e, function(){
	ptrn.createrelate("role", "aclient", e, function(){
	ptrn.createrelate("role", "bclient", e, function(){
	});});});
});

//
ptrn("person", function(e){
	ptrn.createrelate("role", "leader", e, function(){
	ptrn.createrelate("role", "aclient", e, function(){
	ptrn.createrelate("role", "bclient", e, function(){
	});});});
});

//
ptrn("person", function(e){
	ptrn.create("role", "aclient", function(a){ptrn.relate(e,a);});
	ptrn.create("role", "bclient", function(a){ptrn.relate(e,a);});
});

//
ptrn("role", function(role){
	var person = role("person");
	if(person.id()>0){
		console.log(person.value());
		//ptrn.speculativeUnrelate(role, person);
	}
});

//
var roles = ptrn("role", function(r){return r;});
var people = ptrn("person", function(r){return r;});
for(var i=0; i<people.length; i++){
	console.log(people[i].value());
	ptrn.speculativeRelate(roles[i], people[i]);
}

//
ptrn("effort", function(effort){
	var l = effort("person", function(e){return e}).length;
	console.log(l);
	if(l===1){
		ptrn.speculativeRelate(effort, effort("person role:leader"));
	}
})

//create accounts
ptrn("person", function(person){
	ptrn.adduser(person.id(), function(){});
});
