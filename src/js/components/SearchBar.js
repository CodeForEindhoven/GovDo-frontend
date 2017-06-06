var SearchBar = function(){

	var opened = false;

	return {
		view: function(vnode){
			return m(".search",[
				(function(){
					if(opened){
						return m(".popup", [
							m(PersonSelector, {
								onadd: function(person){
									opened = false;
									viewModels.Hierarchy.updatePerson(person.id);
								},
							})
						]);
					} else {
						return m("div",
							m("span",{
							onclick: function(){
								opened = true;
							}
						}, "search"));
					}
				})()

			]);
		}
	};
};
