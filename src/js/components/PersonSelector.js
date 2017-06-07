var PersonSelector = function(){
	var value = "";

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
						return m(FilteredPeopleList, {
							value: value,
							onadd: function(p){
								vnode.attrs.onadd(p);
								value = "";
							},
							onnew: function(p){
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
						});
					} else {
						//show Teams
						return m(TeamList,{
							onadd: function(p){
								vnode.attrs.onadd(p);
							}
						});
					}

				})(),
			]);
		}
	};
};
