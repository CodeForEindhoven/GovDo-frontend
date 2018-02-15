var MissionVision = function(){

	return {
		view: function(vnode){
			return m(".mission",[
				m(".selector-header", [
					m("span", "Missie"),
					m("span.icon-button.icons-header", {
						onclick: function(e){
							vm.edit(vm.program());
						},
					},[
						m("span.icon-button-hint", "Programma Details Bewerken"),
						m(Icon, {
							name: "edit"
						}),
					])
				]),

				(vm.program()("mission").value() !== "") ? [
					m(".mission-mission body-text", vm.program()("mission").value()),

					m(".mission-title", [
						m("span", "Programma Leider"),
					]),
					m(".mission-mission body-text", vm.program()("role:leader person", function(a){
						return m("", a.value());
					}))
				] : [
					m(".selectorlist-emptystate",[
						//m(".selectorlist-emptystate-message-header", "Waar is de visie? ⛅"),
						m(".selectorlist-emptystate-message", [m("em",vm.program().value())," heeft nog geen missie."]),
						m(".selectorlist-emptystate-button.button",{
							onclick: function(){
								vm.edit(vm.program());
							}
						},"Missie toevoegen"),
						m(".selectorlist-emptystate-message", ["Klik op het sleuteltje om de details van het programma te bewerken"]),
					])
				]
			]);
		}
	};
};
