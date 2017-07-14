var FilteredPeopleList = function(){
	Models.Person.loadPeople();

	function getFilterdContent(value){
		return Models.Person.getPeople().filter(function(p){
			return (p.name.toLowerCase().indexOf(value.toLowerCase())>-1);
		});
	}

	return {
		view: function(vnode){
			var filterlist = getFilterdContent(vnode.attrs.value);
			if(filterlist.length > 0){
				//show found people
				return m(".personlist", filterlist.map(function(p){
					return m(".personlist-person",{
						onclick: function(){
							vnode.attrs.onadd(p);
						}
					}, p.name);
				}));
			} else {
				//show new person list
				if(vnode.attrs.allownew){
					return m(".personlist", [
						m(".personlist-person-new", {
							onclick: function(){
								vnode.attrs.onnew();
							}
						}, "voeg '"+vnode.attrs.value+"' toe aan personen")
					]);
				} else {
					return m(".personlist",
						m(".personlist-noresults", "Geen resultaten")
					);
				}

			}
		}
	};
};
