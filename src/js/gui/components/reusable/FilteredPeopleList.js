var FilteredPeopleList = function(){


	function getFilterdContent(value){
		return ptrn("person", function(p){return p;}).filter(function(p){
			return (p.value().toLowerCase().indexOf(value.toLowerCase())>-1);
		}).map(function(p){
			p.displayName = StringHighlight(p.value(), value);
			return p;
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
					}, [
						p.displayName,
						m("i.material-icons .person-list-add-button", "add"),
					]);
				}));
			} else {
				//show new person list
				//if(vnode.attrs.allownew){
				//	return m(".personlist", [
				//		m(".personlist-person-new", {
				//			onclick: function(){
				//				vnode.attrs.onnew();
				//			}
				//		}, "voeg '"+vnode.attrs.value+"' toe aan personen")
				//	]);
				//} else {
					return m(".personlist",
						m(".personlist-noresults", "Geen resultaten")
					);
				//}

			}
		}
	};
};
