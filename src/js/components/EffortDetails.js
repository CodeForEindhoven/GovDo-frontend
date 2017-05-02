var EffortDetails = function(){

	var currentView = -1;
	var content = {
		type: -1,
		People: []
	};

	function getContent(){
		model.get("details/"+currentView, {}, function(data){
			content = data[0];
		});
	}

	function setType(type){
		model.post("details/"+currentView+"/type", {
			type: type
		}, function(){
			getContent();
		});
	}

	function setPerson(person){
		console.log(person);
		model.post("details/"+currentView+"/person", {
			person: person
		}, function(){
			getContent();
		});
	}

	function removePerson(person){
		console.log(person);
		model.post("details/"+currentView+"/removeperson", {
			person: person
		}, function(){
			getContent();
		});
	}


	function updateContent(program){
		if(program!==currentView){
			currentView = program;
			if(program>0){
				getContent();
			}
		}
	}

	return {
		view: function(vnode){
			updateContent(vnode.attrs.view);
			if(currentView>0){
				return m(".half",[
					m(".name", "Details"),
					m(".list",[
						m(TypeSelector, {
							effort: currentView,
							type: content.type,
							onset: setType
						}),
						m(PersonSelector, {
							people: content.People,
							onadd: setPerson,
							onremovePerson: removePerson,
							effort: currentView
						})
					])
				]);
			} else if(vnode.attrs.display){
				return m(".half",[
					m(".name", "Details"),
					m(".list",[])
				]);
			}
		}
	};
};

var TypeSelector = function(){
	var types = [
		"Project",
		"Programma",
		"Routine",
		"Proces",
		"Improvisatie",
		"Klusje"
	];

	var state = false;
	return {
		view: function(vnode){
			if(!state){
				return [
					m(".what", "Type"),
					m(".info", {onclick: function(){state=true;}}, [
						(function(t){
							if(t===-1 ){return m("span", "nog geen type");}
							return m("span",types[t]);
						}(vnode.attrs.type)),
						//m("span.edit", "edit")
					])
				];
			} else {
				return [
					m(".what", "Type"),
					m(".info",[
						m("select.select", {
							onchange: function(event){
								vnode.attrs.onset(parseInt(event.target.value-1));
								state = false;
							}
						}, [
							m("option", {disabled: true, selected: true}, "kies type..."),
							types.map(function(t, c){
								return m("option", {value: c+1}, t);
							})
						])
					])
				];
			}

		}
	};
};

var PersonSelector = function(){
	var rnd = -1;
	var state = false;
	var value = "";
	var peopleList = [];

	function getPeople(){
		model.get("people", {}, function(data){
			peopleList = data;
		});
	}

	function openEditor(){
		state = true;
		getPeople();
	}

	getPeople();

	return {
		view: function(vnode){
			if(rnd!==vnode.attrs.effort){
				rnd = vnode.attrs.effort;
				state = false;
				value = "";
			}

			if(!state){
				if(vnode.attrs.people.length === 0){
					return [
						m(".what", "Mensen"),
						m(".info", {onclick: openEditor}, m(".person", "voeg mensen toe...")),
					];
				} else {
					return [
						m(".what", "Mensen"),
						m(".info", {onclick: openEditor} , [
							vnode.attrs.people.map(function(person){
								return m(".person", person.name);
							}),
						]),
					];
				}
			} else {
				return [
					m(".what", "Mensen"),
					m(".info.mode", [
						vnode.attrs.people.map(function(person){
							return m(".person", [
								m("span.n", person.name),
								m("span.edit", {
									onclick: function(){
										console.log("click remove");
										vnode.attrs.onremovePerson(person.name);
									}
								},"verwijder")
							]);
						}),
						m("datalist#people",peopleList.map(function(p){
							return m("option", {value: p.name});
						})),
						m("input.input", {
							list: "people",
							placeholder: "Voornaam Achternaam",
							oninput: m.withAttr("value", function(v) {value = v;}),
							onchange: m.withAttr("value", function(v) {value = v;}),
							value: value
						}),
						m("button", {onclick: function(){
							if(value!==""){
								vnode.attrs.onadd(value);
							}
							value = "";
						}},"+")
					]),
				];
			}

		}
	};
};
