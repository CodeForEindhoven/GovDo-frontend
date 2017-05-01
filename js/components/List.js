var List = function(){
	return {
		view: function(vnode){
			return m(".half",[
				m(".name", vnode.attrs.title),
				m(".list", vnode.attrs.content.map(function(element){
					return m(ListItem, {
						content: element,
						onclick: vnode.attrs.onclick,
						selected: (vnode.attrs.selected === element.id)
					});
				}))
			]);
		}
	};
};

var ListItem = function(){
	return {
		view: function(vnode){
			console.log(vnode.attrs.selected);
			return m(".listItem"+(vnode.attrs.selected?".selected":""), {
				onclick: function(){
					vnode.attrs.onclick(vnode.attrs.content.id);
				}
			}, [
				m(".number", vnode.attrs.content.id),
				m(".content", vnode.attrs.content.name)
			]);
		}
	};
};
