var Group = function(){
	var group = {};
	m.request({
		method: "GET",
		url: api+"group/3",
	}).then(function(result) {
		group = result[0];
	});

	return {
		view: function(vnode){
			return [
				m(Menu, {name: group.name})
			];
		}
	};
};
