var ProgramEditor = function(){
	return {
		view: function(vnode){
			return m(".efforteditor",[
				m(".editor-subtitle", "Programma titel"),
				m(TextArea, {
					value: viewModels.editMode.content().name,
					onchange: function(v){
						viewModels.editMode.setContent("name", v);
					}
				}),


				m(".editor-subtitle", "Programma missie"),
				m("i.material-icons", {}, "info_outline"),
				m(TextArea, {
					value: viewModels.editMode.content().mission,
					onchange: function(v){
						viewModels.editMode.setContent("mission", v);
					}
				})
			]);
		}
	};
};
