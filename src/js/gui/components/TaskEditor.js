var TaskEditor = function(){
	return {
		view: function(vnode){
			return m(".efforteditor",[
				m(".editor-subtitle", "Opgave titel"),
				m(TextArea, {
					value: viewModels.editMode.content().name,
					placeholder: "title",
					onchange: function(v){
						viewModels.editMode.setContent("name", v);
					}
				}),

				m(".editor-subtitle", "door"),
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
