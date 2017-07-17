var TaskEditor = function(){
	return {
		view: function(vnode){
			return m(".efforteditor",[
				m(".editor-subtitle", "Opgave titel"),
				m(TextArea, {
					value: viewModels.editMode.content().name,
					onchange: function(v){
						viewModels.editMode.setContent("name", v);
					}
				}),

				m(".editor-subtitle opg-door", "door"),
				m(TextArea, {
					value: viewModels.editMode.content().means,
					onchange: function(v){
						viewModels.editMode.setContent("means", v);
					}
				}),

				m(".editor-subtitle", "Opgave indicator"),
				m("i.material-icons", {}, "info_outline"),
				
				m(TextArea, {
					value: viewModels.editMode.content().kpi,
					onchange: function(v){
						viewModels.editMode.setContent("kpi", v);
					}
				}),
				
				m(".editor-subtitle", "Status"),
				m("i.material-icons", {}, "info_outline"),

				m(".status-content",[
					m(Toggle, {
						value: viewModels.editMode.content().mode,
						label_sketch: "Schets",
						label_definitive: "Definitief",
						onchange: function(v){
							viewModels.editMode.setContent("mode", v);
						}
					}),
				]),
			]);
		}
	};
};
