var NavWidget = function(){
	function focus(node){
		if(node.type()==="effort"){
			vm.program(node("task")("program"));
			vm.task(node("task"));
			vm.effort(node);
			vm.focus(node);
		}

		if(node.type()==="person"){
			vm.person(node);
			if(!vm.effort() || (vm.effort()("#"+node.id()).id() === -1)){
				vm.taskClose();
				vm.effortClose();
			}

			//vm.task(node("effort task"));
			//vm.effort(node("effort task effort"));
			//vm.effort(node("task effort"));
			vm.focus(node);
		}
	}

	return {
		view: function(vnode){
			return m(".navwidget",[
				m(".navwidget-view", {
					onclick: function(){
						focus(vnode.attrs.node);
						vm.page(2);
					}
				}, m(Icon, {name: "general-small"})),

				m(".navwidget-view", {
					onclick: function(){
						focus(vnode.attrs.node);
						vm.page(0);
					}
				}, m(Icon, {name: "programma-cloud-small"})),

				m(".navwidget-view", {
					onclick: function(){
						focus(vnode.attrs.node);
						vm.page(1);
					}
				}, m(Icon, {name: "kalendar-small"})),
			]);
		}
	};
};
