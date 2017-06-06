var PersonSelector = function(){
	var rnd = -1;
	var state = true;
	var value = "";

	Models.Person.loadPeople();
	Models.Person.loadTeams();

	function getFilterdContent(){
		return Models.Person.getPeople().filter(function(p){
			return (p.name.toLowerCase().indexOf(value.toLowerCase())>-1);
		});
	}

	return {
		view: function(vnode){
			return m(".PersonSelector",[
				//search bar
				m("input.input", {
					placeholder: "Voornaam Achternaam",
					oninput: m.withAttr("value", function(v) {value = v;}),
					onchange: m.withAttr("value", function(v) {value = v;}),
					value: value
				}),
				(function(){
					//if searchbar is active
					if(value.length>0){
						var filterlist = getFilterdContent();
						if(filterlist.length > 0){
							//show found people
							return m(".PersonList", filterlist.map(function(p){
								return m(".person",{
									onclick: function(){
										vnode.attrs.onadd(p);
										value = "";
									}
								}, p.name);
							}));
						} else {
							//show new person list
							return m(".PersonList", [
								m(".personAdd", {
									onclick: function(){
										Models.Person.newItem(value, function(p){
											Models.Person.loadTeams();
											Models.Person.loadPeople();
											vnode.attrs.onadd({
												id: p.id,
												name: p.name
											});
											value = "";
										});
									}
								}, "voeg '"+value+"' toe aan personen")
							]);
						}
					} else {
						//show Teams
						return m(".PersonList", Models.Person.getTeams().map(function(t){
							return m(".team",{
								oncreate: function(vnode){
									if(t.id === viewModels.Hierarchy.getProgram()){
										vnode.dom.scrollIntoView(true);
									}
								}
							},[
								m(".name", t.name),
								t.People.map(function(p){
									return m(".person",{
										onclick: function(){
											vnode.attrs.onadd(p);
										}
									}, p.name);
								})
							]);
						}));
					}

				})(),
			]);
		}
	};
};
