var DateDisplay = function(){
	return {
		view: function(vnode){
			return m("span.date-display", FuzzyDate.toReadableString(vnode.attrs.date));
		}
	};
};
