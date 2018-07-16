

//create new program

var domain = ptrn("domain",e=>e)[0]

ptrn.createrelate("program", "Jeugd – Wonen & Verblijf", domain, function(p){
	ptrn.createrelate("mission", "", p, function(){
	ptrn.createrelate("order", "1a", p, function(){
	});});
});

ptrn.createrelate("program", "Jeugd – Ondersteuning Zelfstandig Leven", domain, function(p){
	ptrn.createrelate("mission", "", p, function(){
	ptrn.createrelate("order", "1b", p, function(){
	});});
});

ptrn.createrelate("program", "Jeugd – Sociale Basis", domain, function(p){
	ptrn.createrelate("mission", "", p, function(){
	ptrn.createrelate("order", "1c", p, function(){
	});});
});

ptrn.createrelate("program", "Jeugd – Veiligheid", domain, function(p){
	ptrn.createrelate("mission", "", p, function(){
	ptrn.createrelate("order", "1d", p, function(){
	});});
});


var ozl = ptrn("#5010")
var jeugd = ptrn("#2")
var move = vm.task()

ptrn.unrelate(jeugd, move)
ptrn.relate(ozl, move)

[4773, 4825, 4829, 4833, 4837, 4841]


//set order

var parent = vm.focus();
parent("task", function(t){
	return t;
}).sort(function(a,b){
	return parseInt(a("order").value()) - parseInt(b("order").value());
}).map(function(t,c){
	console.log(t("order").update(c+1));
});

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

//create contracts
ptrn("person", function(p){ptrn.createrelate("contract", "40", p);})
ptrn("person", function(p){ptrn.createrelate("plannable", "40", p);})
