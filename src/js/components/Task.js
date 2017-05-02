var Task = function(){

	var currentView = -1;
	var content = [];
	var onclick;

	function getContent(){
		model.get("task/"+currentView, {}, function(data){
			content = data[0].Tasks;
		});
	}

	function updateContent(program){
		if(program!==currentView){
			currentView = program;
			if(program>0){
				getContent();
			}
		}
	}

	function newItem(name){
		model.post("task/"+currentView, {
			name: name
		}, function(data){
			getContent();
			onclick(data.id);
		});
	}

	return {
		oninit: function(vnode){
			onclick = function(id){
				vnode.attrs.onselect(id);
				shiftViewer(1);
			};
		},
		view: function(vnode){
			updateContent(vnode.attrs.view);
			if(currentView>0){
				return m(List, {
					title:"Opgaven ",
					selected: vnode.attrs.selected,
					content: content,
					onclick: onclick,
					onadd: newItem
				});
			}
		}
	};
};
