var List = function(){

	return {
		view: function(vnode){
			return m("",[
				m(".header", vnode.attrs.title),
				vnode.attrs.addbutton?m(".addbutton", {onclick: vnode.attrs.onadd},"+"):m(""),
				(vnode.attrs.content.length === 0)? m(".list", "deze lijst is leeg!") : m(".list", vnode.attrs.content),
			]);
		}
	};
};

var ListItem = function(){
	return {
		view: function(vnode){
			return m(".listItem"+(vnode.attrs.selected()?".selected":""), {
				onclick: function(){
					vnode.attrs.onclick();
				}
			}, [
				m(".left",[
					m(".number", vnode.attrs.number),
					m(".edit", {
						onclick: function(e) {
							e.preventDefault();
							vnode.attrs.onedit();
						}
					}, "edit"),
				]),
				m(".right",[
					m(".content", vnode.attrs.content),
				])
			]);
		}
	};
};
