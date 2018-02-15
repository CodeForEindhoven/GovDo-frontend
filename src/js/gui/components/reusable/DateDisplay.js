var DateDisplay = function(){
	return {
		view: function(vnode){
			return m("span.date-display", {
				onclick: function(){
					if(vnode.attrs.onclick){
						vnode.attrs.onclick(FuzzyDate.toRange(vnode.attrs.date));
					}
				}
			}, FuzzyDate.toReadableString(vnode.attrs.date));
		}
	};
};
