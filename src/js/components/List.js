var List = function(){

	return {
		view: function(vnode){
			return m("",[
				m(".name", vnode.attrs.title),
				vnode.attrs.addbutton?m(".addbutton", {onclick: vnode.attrs.onadd},"+"):m(""),
				m(".list", [
					vnode.attrs.content.map(function(element, count){
						if(element.type === "subtitle") {
							return m(".subtitle", element.name);
						} else {
							return m(ListItem, {
								content: element,
								count: count+1,
								onclick: function(id){
									vnode.attrs.onclick(id);
								},
								onedit: function(id){
									vnode.attrs.onedit(id);
								},
								selected: (vnode.attrs.selected === element.id)
							});
						}
					}),
				]),
				//(vnode.attrs.content.length === 0)? m(".message", "nothing here!") : m("")
			]);
		}
	};
};

var ListItem = function(){
	return {
		view: function(vnode){
			return m(".listItem"+(vnode.attrs.selected?".selected":""), {
				onclick: function(){
					vnode.attrs.onclick(vnode.attrs.content.id);
				}
			}, [
				m(".left",[
					m(".number", vnode.attrs.count),
					m(".edit", {
						onclick: function(e) {
							e.preventDefault();
							vnode.attrs.onedit(vnode.attrs.content);
						}
					}, "edit"),
				]),
				m(".right",[
					m(".content", vnode.attrs.content.name),
					m(".subcontent", vnode.attrs.content.subcontent)
				])
			]);
		}
	};
};
