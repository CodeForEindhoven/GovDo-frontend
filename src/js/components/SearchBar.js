var SearchBar = function(){

	var opened = false;
	var value = "";

	return {
		view: function(vnode){
			return [
				(function(){
					if(opened){
						return m(".fullscreen", m(".grey",{
							onclick: function(){
								opened = false;
							}
						}));
					}
				}()),

				m(".search"+(opened?".active":""), [
					m("div",
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
							return m(".popup",[
								m(".column", [
									m(".header","Inspanningen"),
									m(SearchList,{
										value: value,
										onfind: function(){
											opened = false;
										}
									})
								]),
								m(".column", [
									m(".header","Personeel"),
									(function(){
										if(value.length>0){
											return m(FilteredPeopleList, {value: value});
										} else {
											return m(TeamList);
										}
									})()

								]),
								m(".column",[
									m(".header","Recente Veranderingen"),
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
