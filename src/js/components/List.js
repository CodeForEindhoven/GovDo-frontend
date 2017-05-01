var List = function(){
	return {
		view: function(vnode){
			return m(".half",[
				m(".name", vnode.attrs.title),
				m(".list", [
					vnode.attrs.content.map(function(element, count){
						return m(ListItem, {
							content: element,
							count: count,
							onclick: vnode.attrs.onclick,
							selected: (vnode.attrs.selected === element.id)
						});
					}),
					m(AddItem, {
						onadd: vnode.attrs.onadd,
						rnd: vnode.attrs.content,
						number: vnode.attrs.content.length+1
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
				m(".number", vnode.attrs.count+1),
				m(".content", vnode.attrs.content.name)
			]);
		}
	};
};

var AddItem = function(){
	var state = false;
	var value = "";
	var id = 0;

	return {
		view: function(vnode){
			if(id != vnode.attrs.rnd){
				state = false;
				value = "";
				id = vnode.attrs.rnd;
			}
			if(!state){
				return m(".listItem", {
					onclick: function(){state = true;}
				}, m(".number.add", "+"));
			} else {
				return m(".listItem.add", [
					m(".number", vnode.attrs.number),
					m("form.form", {
						onsubmit: function(e) {
							e.preventDefault();
							console.log(value);
							vnode.attrs.onadd(value);
							value = "";
							state = false;
						}
					}, [
						m("textarea.input[placeholder=Titel][autofocus=true]", {
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
