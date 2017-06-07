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
					(function(){
						if(opened){
							return m(".popup",[
								m(".column", [
									m(".header","Inspanningen"),
								]),
								m(".column", [
									m(".header","Personeel"),
									m(TeamList)
								]),
								m(".column",[
									m(".header","Recente Veranderingen"),
									m(ChangesList)
								]),
							]);
						}
					})(),

					m("div",
						m("input",{
							placeholder: "Zoeken naar ...",
							value: value,
							onchange: m.withAttr("value", function(v) {value = v;}),
							onclick: function(){
								opened = true;
							}
						})
					),
				])
			];
		}
	};
};
