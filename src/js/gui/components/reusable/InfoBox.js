var InfoBox = function(){
	return {
		view: function(vnode){
			return m("div.info-box", [
				m("i.material-icons", "info_outline"),
				m("div.info-box-popup", vnode.attrs.content)
			]);
		}
	};
};
