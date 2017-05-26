var List = function(){


	return {
		view: function(vnode){
			return m("",[
				m(".name", vnode.attrs.title),
				m(".addbutton", {onclick: vnode.attrs.onadd},"+"),
				m(".list", [
					vnode.attrs.content.map(function(element, count){
						if(element.type === "subtitle") {
							return m(".subtitle", element.name);
						} else {
							return m(ListItem, {
								content: element,
								count: count,
								onclick: function(id){
									vnode.attrs.onclick(id);
								},
								onedit: function(id){
									vnode.attrs.onedit(id);
								},
								selected: (vnode.attrs.selected === element.id)
							});
						}
					}),				])
			]);
		}
	};
};

var ListItem = function(){
	return {
		view: function(vnode){
			return m(".listItem"+(vnode.attrs.selected?".selected":""), {
				onclick: function(){
					console.log("open");
					vnode.attrs.onclick(vnode.attrs.content.id);
				}
			}, [
				m(".left",[
					m(".number", vnode.attrs.content.id),
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
