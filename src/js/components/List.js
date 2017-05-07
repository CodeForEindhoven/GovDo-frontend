var List = function(){
	var addstate = false;
	function setAddState(v){
		if(v!==undefined){addstate=v;}
		return addstate;
	}

	return {
		view: function(vnode){
			return m(".half",[
				m(".name", vnode.attrs.title),
				m(".list", [
					vnode.attrs.content.map(function(element, count){
						return m(ListItem, {
							content: element,
							count: count,
							onclick: function(id){
								setAddState(false);
								vnode.attrs.onclick(id);
							},
							selected: (vnode.attrs.selected === element.id)
						});
					}),
					//m(AddItem, {
					//	onadd: vnode.attrs.onadd,
					//	rnd: vnode.attrs.content,
					//	number: vnode.attrs.content.length+1,
					//	state: setAddState,
					//	onswitch: function(){
					//		vnode.attrs.onclick(-1);
					//	}
					//})
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
				m(".left",[
					m(".number", vnode.attrs.count+1),
					m(".edit", "edit"),
				]),
				m(".right",[
					m(".content", vnode.attrs.content.name),
					m(".subcontent", vnode.attrs.content.subcontent)
				])
			]);
		}
	};
};

var AddItem = function(){
	var value = "";
	var id = 0;

	return {
		view: function(vnode){
			if(id != vnode.attrs.rnd){
				state = false;
				value = "";
				id = vnode.attrs.rnd;
			}
			if(!vnode.attrs.state()){
				return m(".listItem", {
					onclick: function(){
						vnode.attrs.state(true);
						vnode.attrs.onswitch();
					}
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
							vnode.attrs.state(false);
						}
					}, [
						m("textarea.input[placeholder=Titel][autofocus=true][wrap=hard]", {
							oninput: m.withAttr("value", function(v) {value = v;}),
							value: value,
							oncreate: function(vnode){
								setTimeout(function () {
									vnode.dom.focus();
								}, 10);
							}
						}),
						m("button.button[type=submit]", "Toevoegen")
					])

				]);
			}
		}
	};
};
