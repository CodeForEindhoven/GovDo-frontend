var List = function(){
	return {
		view: function(vnode){
			return m(".half",[
				m(".name", vnode.attrs.title),
				m(".list", vnode.attrs.content.map(function(element, count){
					return m(ListItem, {count: count+1, content: element, level: vnode.attrs.count});
				}))

			]);
		}
	};
};

var ListItem = function(){
	return {
		view: function(vnode){
			return m(".listItem", {
				onclick: function(e){
					shiftViewer(vnode.attrs.level);
				}
			}, [
				m(".number", vnode.attrs.count),
				m(".content", vnode.attrs.content)
			]);
		}
	};
};
