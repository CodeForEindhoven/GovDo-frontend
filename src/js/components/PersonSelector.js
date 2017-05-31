var PersonSelector = function(){
	var rnd = -1;
	var state = true;
	var value = "";

	Models.Person.loadContent();

	function getFilterdContent(){
		return Models.Person.getContent().filter(function(p){
			return (p.name.toLowerCase().indexOf(value.toLowerCase())>-1);
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
									value = "";
								}
							}, p.name);
						}));
					} else {
						return m(".PersonList", [
							m(".personAdd", {
								onclick: function(){
									Models.Person.newItem(value, function(p){
										Models.Person.loadContent();
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
				})(),
			]);
		}
	};
};
