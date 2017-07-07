viewModels.editMode = (function(){
	var state = false;
	var type = "";
	var content = {};

	return {
		state: function(){return state;},
		isType: function(t){return (type === t);},
		content: function(){return content;},

		setContent: function(key, value){
			content[key] = value;
		},

		set: function(t, c){
			state = true;
			type = t;
			if(c){
				//DEEP COPY CONTENT
				content = JSON.parse(JSON.stringify(c));
			}
		},
		close: function(){
			state = false;
			type = "";
			content = {};
		}
	};
})();
