var Task = function(){

	var currentView = -1;
	var content = [];

	function getContent(){
		model.get("task/"+currentView, {}, function(data){
			content = data[0].Tasks;
		});
	}

	function updateContent(program){
		if(program>0 && (program!==currentView)){
			currentView = program;
			getContent();
		}
	}

	function newItem(name){
		model.post("task/"+currentView, {
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
					title:"Opgaven ",
					selected: vnode.attrs.selected,
					content: content,
					onclick: function(id){
						vnode.attrs.onselect(id);
						shiftViewer(1);
					},
					onadd: newItem
				});
			}
		}
	};
};
