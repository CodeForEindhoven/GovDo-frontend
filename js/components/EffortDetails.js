var EffortDetails = function(){

	var currentView = -1;
	var content = [];

	function getContent(){
		model.get("details/"+currentView, {}, function(data){
			content = data[0].People;
		});
	}

	function updateContent(program){
		if(program>0 && (program!==currentView)){
			currentView = program;
			getContent();
		}
	}

	function newItem(name){
		model.post("effort/"+currentView, {
			name: name
		}, function(){
			getContent();
		});
	}

	return {
		view: function(vnode){
			updateContent(vnode.attrs.view);
			if(currentView>0){
				return m(".half",[
					m(".name", "Details")
				]);
				//m(List, {
				//	title:"Details",
				//	content: content,
				//	onclick: function(id){
				//		vnode.attrs.onselect(id);
				//		shiftViewer(1);
				//	},
				//	onadd: newItem
				//});
			}
		}
	};
};
