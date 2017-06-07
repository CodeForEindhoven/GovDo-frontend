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
				return m(".PersonList", filterlist.map(function(p){
					return m(".person",{
						onclick: function(){
							vnode.attrs.onadd(p);
						}
					}, p.name);
				}));
			} else {
				//show new person list
				return m(".PersonList", [
					m(".personAdd", {
						onclick: function(){
							vnode.attrs.onnew(p);
						}
					}, "voeg '"+vnode.attrs.value+"' toe aan personen")
				]);
			}
		}
	};
};
