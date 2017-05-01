var List = function(){
	return {
		view: function(vnode){
			return m(".half",[
				m(".name", vnode.attrs.title),
				m(".list", [
					vnode.attrs.content.map(function(element){
						return m(ListItem, {
							content: element,
							onclick: vnode.attrs.onclick,
							selected: (vnode.attrs.selected === element.id)
						});
					}),
					m(AddItem, {
						onadd: vnode.attrs.onadd
					})
				])
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
				m(".number", vnode.attrs.content.id),
				m(".content", vnode.attrs.content.name)
			]);
		}
	};
};

var AddItem = function(){
	var state = false;
	var value = "";
	return {
		view: function(vnode){
			if(!state){
				return m(".listItem", {
					onclick: function(){state = true;}
				}, m(".number.add", "+"));
			} else {
				return m(".listItem.add", [
					m(".number", ">"),
					m("form.form", {
						onsubmit: function(e) {
							e.preventDefault();
							console.log(value);
							vnode.attrs.onadd(value);
							value = "";
							state = false;
						}
					}, [
						m("input.input[placeholder=Naam][autofocus=true]", {
							oninput: m.withAttr("value", function(v) {value = v;}),
							value: value
						}),
						m("button.button[type=submit]", "Toevoegen")
					])

				]);
			}
		}
	};
};
