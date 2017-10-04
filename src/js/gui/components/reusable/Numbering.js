var Numbering = function(){
	return {
		view: function(vnode){
			var element = vnode.attrs.node;
			var type = element.type();

			if(!vnode.attrs.whole || type === "program"){
				return m(".numbering", [
					m(".numbering-number", element("order").value()),
				]);
			} else if(type === "task") {
				return m(".numbering", [
					m(".numbering-number-small", element("task")("program")("order").value()),
					m(".numbering-number-small", element("task")("order").value()),
				]);
			} else if(type === "effort") {
				return m(".numbering", [
					m(".numbering-number-small", element("task")("program")("order").value()),
					m(".numbering-number-small", element("task")("order").value()),
					m(".numbering-number-small", element("order").value()),
				]);
			}
		}
	};
};
