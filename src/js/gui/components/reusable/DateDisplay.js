var DateDisplay = function(){
	return {
		view: function(vnode){
			return m(".datedisplay", FuzzyDate.toReadableString(vnode.attrs.date));
		}
	};
};
