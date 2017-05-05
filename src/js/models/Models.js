var Models = {};

var model = {
	get: function(adress,data,callback){
		m.request({
			method: "GET",
			url: config.api_endpoint+adress
		}).then(callback);
	},

	post: function(adress,data,callback){
		m.request({
			method: "POST",
			url: config.api_endpoint+adress,
			data: data
		}).then(callback);
	}
};
