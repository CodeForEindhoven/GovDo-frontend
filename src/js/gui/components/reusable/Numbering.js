var Numbering = function(){
	return {
		view: function(vnode){
			var element = vnode.attrs.node;
			var type = element.type();

			if(!vnode.attrs.whole){
				return m(".numbering", {
					class: vnode.attrs.selected ? "state-selected" : ""
				}, [
					m(".numbering-number", element("order").value()),
				]);
			} else if(type === "program") {
				return m(".numbering", [
					m(".numbering-number-small", element("order").value()),
				]);
			}
			else if(type === "task") {
				return m(".numbering", [
					m(".numbering-number-small", element("program")("order").value()),
					m(".numbering-number-small", element("order").value()),
				]);
			} else if(type === "effort") {
				return m(".numbering", {
					class: (vnode.attrs.disabled ? "state-disabled " : " ") + (vnode.attrs.selected ? "state-selected" : "")
				},[
					m(".numbering-number-small", element("task")("program")("order").value()),
					m(".numbering-number-small", element("task")("order").value()),
					m(".numbering-number-small", element("order").value()),
				]);
			} else {
				return [];
			}
		}
	};
};
