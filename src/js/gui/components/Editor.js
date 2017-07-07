var Editor = function(){
	return {
		view: function(vnode){
			return m(".editor",{
				class: viewModels.editMode.state() ? "state-edit": "state-hidden"
			}, (function(){
				if(viewModels.editMode.isType("effort")){
					return m(EffortEditor);
				}
			})());
		}
	};
};
