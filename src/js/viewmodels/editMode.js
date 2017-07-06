viewModels.editMode = (function(){
	var mode = false;

	return {
		get: function(){
			return mode;
		},
		set: function(type, source){
			mode = true;
		},
		close: function(){
			mode = false;
		}
	};
})();
