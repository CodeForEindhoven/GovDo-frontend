var SearchBar = function(){

	var opened = false;
	var value = "";

	return {
		view: function(vnode){
			return [
				(function(){
					if(opened){
						return m(".overlay-fullscreen", m(".overlay-color",{
							onclick: function(){
								opened = false;
							}
						}));
					}
				}()),

				m(".searchbar"+(opened?".state-active":""), [
					m("div",
//						m("input.input",{
						m("input",{
							placeholder: "Zoeken naar ...",
							value: value,
							oninput: m.withAttr("value", function(v) {value = v;}),
							onchange: m.withAttr("value", function(v) {value = v;}),
							onclick: function(){
								opened = true;
							}
						})
					),
					(function(){
						if(opened){
							return m(".searchbar-popup",[
								m(".searchbar-popup-column", [
									m(".searchbar-popup-header","Inspanningen"),
									m(SearchList,{
										value: value,
										onfind: function(){
											opened = false;
										}
									})
								]),
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
								m(".searchbar-popup-column",[
									m(".searchbar-popup-header","Recente Veranderingen"),
									m(ChangesList,{
										onfind: function(){
											opened = false;
										}
									})
								]),
							]);
						}
					})(),
				])
			];
		}
	};
};
