var Effort = function(){

	var currentView = -1;
	var content = [];

	function getContent(){
		model.get("effort/"+currentView, {}, function(data){
			content = data[0].Efforts;
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
				return m(List, {
					title:"Inspanningen",
					content: content,
					selected: vnode.attrs.selected,
					onclick: function(id){
						vnode.attrs.onselect(id);
						shiftViewer(2);
					},
					onadd: newItem
				});
			}
		}
	};
};
