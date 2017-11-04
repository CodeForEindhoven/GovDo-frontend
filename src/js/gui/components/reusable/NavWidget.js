var NavWidget = function(){
	function focus(node){
		if(node.type()==="effort"){
			vm.program(node("task")("program"));
			vm.task(node("task"));
			vm.effort(node);
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

				m(".personal-efforts-view", {
					onclick: function(){
						focus(vnode.attrs.node);
						vm.page(0);
					}
				}, m(Icon, {name: "programma-small"})),

				m(".personal-efforts-view", {
					onclick: function(){
						focus(vnode.attrs.node);
						vm.page(1);
					}
				}, m(Icon, {name: "kalendar-small"})),
			]);
		}
	};
};
