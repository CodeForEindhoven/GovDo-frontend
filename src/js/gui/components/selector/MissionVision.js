var MissionVision = function(){

	return {
		view: function(vnode){
			return m(".mission",[
				m(".mission-title", [
					m("span", "Missie"),
					m("span.mission-edit.button-edit-small",{
						onclick: function(){
							vm.edit(vm.program());
						}
					}, m(Icon, {name: "edit"})),
				]),
				m(".mission-mission body-text", vm.program()("mission").value()),


			]);
		}
	};
};
