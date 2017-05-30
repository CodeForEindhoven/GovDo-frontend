var PersonSelector = function(){
	var rnd = -1;
	var state = true;
	var value = "";

	Models.Person.loadContent();

	function getFilterdContent(){
		return Models.Person.getContent().filter(function(p){
			return (p.name.indexOf(value)>-1);
		});
	}

	return {
		view: function(vnode){
			return m(".PersonSelector",[
				m("input.input", {
					placeholder: "Voornaam Achternaam",
					oninput: m.withAttr("value", function(v) {value = v;}),
					onchange: m.withAttr("value", function(v) {value = v;}),
					value: value
				}),
				(function(){
					var filterlist = getFilterdContent();
					if(filterlist.length > 0){
						return m(".PersonList", filterlist.map(function(p){
							return m(".person",{
								onclick: function(){
									vnode.attrs.onadd(p);
								}
							}, p.name);
						}));
					} else {
						return m(".PersonList", [
							m(".personAdd", {
								onclick: function(){
									Models.Person.newItem(value, function(p){
										Models.Person.loadContent();
										vnode.attrs.onadd(p);
									});
								}
							}, "voeg '"+value+"' toe aan personen")
						]);
					}
				})(),

			]);
			//if(rnd!==vnode.attrs.effort){
			//	rnd = vnode.attrs.effort;
			//	value = "";
			//}
			//console.log(vnode.attrs.people);
			//return [
			//	m(".name", "Mensen"),
			//	m(".info.mode", [
			//		vnode.attrs.people.map(function(person){
			//			return m(".person", [
			//				m("span.n", person.name),
			//				m("span.remove", {
			//					onclick: function(){
			//						console.log("click remove");
			//						vnode.attrs.onremovePerson(person.name);
			//					}
			//				},"-")
			//			]);
			//		}),
			//		m("datalist#people", peopleList.map(function(p){
			//			return m("option", {value: p.name});
			//		})),
			//		m("input.input", {
			//			list: "people",
			//			placeholder: "Voornaam Achternaam",
			//			oninput: m.withAttr("value", function(v) {value = v;}),
			//			onchange: m.withAttr("value", function(v) {value = v;}),
			//			value: value
			//		}),
			//		m("button", {onclick: function(e){
			//			e.preventDefault();
			//			if(value!==""){
			//				vnode.attrs.onadd(value);
			//			}
			//			value = "";
			//		}},"+")
			//	]),
			//];
		}
	};
};
