var SearchBar = function(){

	var opened = false;
	var value = "";

	return {
		view: function(vnode){
			return [
				(function(){
					if(opened){
						return m(".overlay-fullscreen",{
							onclick: function(){
								opened = false;
							}
						});
					}
				}()),

				m(".searchbar"+(opened?".state-active":""), [
					m("div",
						m("input",{
							placeholder: "Zoeken naar ...",
							value: value,
							oninput: m.withAttr("value", function(v) {
								value = v;
								if(value.length > 0){
									Models.Search.loadContent(value);
								}
							}),
							onclick: function(){
								opened = true;
							}
						})
					),
					(function(){
						if(opened){
							return m(".searchbar-popup",[
								((value.length > 0)?
									m(".searchbar-popup-column", [
										m(".searchbar-popup-header","Inspanningen"),
										m(SearchList,{
											value: value,
											onfind: function(){
												opened = false;
											}
										})
									])
								:
									m(".searchbar-popup-column",[
										m(".searchbar-popup-header","Recente Veranderingen"),
										m(ChangesList,{
											onfind: function(){
												opened = false;
											}
										})
									])
								),
								m(".searchbar-popup-column", [
									m(".searchbar-popup-header","Personeel"),
									(function(){
										if(value.length>0){
											return m(FilteredPeopleList, {value: value});
										} else {
											return m(TeamList);
										}
									})()

								]),
							]);
						}
					})(),
				])
			];
		}
	};
};
