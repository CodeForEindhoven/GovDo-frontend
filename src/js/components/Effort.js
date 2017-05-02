var Effort = function(){

	var currentView = -1;
	var content = [];
	var onclick;

	function getContent(){
		model.get("effort/"+currentView, {}, function(data){
			content = data[0].Efforts;
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
		model.post("effort/"+currentView, {
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
				shiftViewer(2);
			};
		},
		view: function(vnode){
			updateContent(vnode.attrs.view);
			if(currentView>0){
				return m(List, {
					title:"Inspanningen",
					content: content,
					selected: vnode.attrs.selected,
					onclick: onclick,
					onadd: newItem
				});
			}
		}
	};
};
