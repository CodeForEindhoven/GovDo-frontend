var Editor = function(){
	return {
		view: function(vnode){
			return m(".editor",{
				class: viewModels.editMode.get() ? "state-edit": "state-hidden"
			},"editor");
		}
	};
};
