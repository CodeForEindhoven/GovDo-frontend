var Task = function(){

	var currentProgram = -1;
	var content = [];

	function updateContent(program){
		if(program>0 && (program!==currentProgram)){
			currentProgram = program;
			model.get("task/"+currentProgram, {}, function(data){
				content = data[0].Tasks;
			});
		}
	}

	return {
		view: function(vnode){
			updateContent(vnode.attrs.program);
			if(currentProgram>0){
				return m(List, {
					title:"Opgaven ",
					content: content,
					onclick: function(id){
						vnode.attrs.onselect(id);
						shiftViewer(1);
					}
				});
			}
		}
	};
};
