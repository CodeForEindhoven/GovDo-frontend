var DateDisplay = function(){


	function parseValue(input){
		var date = [];
		var d = input.split("/");
		date[0] = years().find(function(e){
			return (!e.splitter) && (e.value === d[0]);
		});
		date[1] = months().find(function(e){
			return (!e.splitter) && (e.value === d[1]);
		});
		date[2] = days().find(function(e){
			return (!e.splitter) && (e.value === d[2]);
		});

		date[0] = date[0] || {value: false};
		date[1] = date[1] || {value: false};
		date[2] = date[2] || {value: false};
		
	}

	return {
		view: function(vnode){
			return m(".datedisplay", parseValue(vnode.attrs.date));
		}
	};
};
