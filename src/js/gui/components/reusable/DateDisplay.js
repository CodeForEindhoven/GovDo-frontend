var DateDisplay = function(){
	return {
		view: function(vnode){
			return m("span.datedisplay", FuzzyDate.toReadableString(vnode.attrs.date));
		}
	};
};
