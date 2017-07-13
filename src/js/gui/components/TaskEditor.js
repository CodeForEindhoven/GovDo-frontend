var TaskEditor = function(){
	return {
		view: function(vnode){
			return m(".efforteditor",[
				m(Toggle, {
					value: viewModels.editMode.content().mode,
					label: "schets",
					onchange: function(){
						var v = viewModels.editMode.content().mode;
						if(v===0){v=-1;}else{v=0;}
						viewModels.editMode.setContent("mode", v);
					}
				}),

				m(".editor-subtitle", "Opgave titel"),
				m(TextArea, {
					value: viewModels.editMode.content().name,
					placeholder: "title",
					onchange: function(v){
						viewModels.editMode.setContent("name", v);
					}
				}),

				m(".editor-subtitle opg-door", "door"),
				m(TextArea, {
					value: viewModels.editMode.content().means,
					placeholder: "door",
					onchange: function(v){
						viewModels.editMode.setContent("means", v);
					}
				})
			]);
		}
	};
};
