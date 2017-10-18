var InfoBox = function(){
	return {
		view: function(vnode){
			return m("div.info-box", [
				//m("i.material-icons", "info_outline"),
				m(Icon, {name: "info"}),
				m("div.info-box-popup.box-editor-style", vnode.attrs.content)
			]);
		}
	};
};
