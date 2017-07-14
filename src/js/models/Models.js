var Models = {};

var model = {
	get: function(adress,data,callback){
		m.request({
			method: "GET",
			url: config.api_endpoint+adress
		}).catch(function(reason){
			window.alert(reason);
		}).then(callback);
	},

	post: function(adress,data,callback){
		m.request({
			method: "POST",
			url: config.api_endpoint+adress,
			data: data
		}).catch(function(reason){
			window.alert(reason);
		}).then(callback);
	},

	delete: function(adress,data,callback){
		m.request({
			method: "DELETE",
			url: config.api_endpoint+adress,
			data: data
		}).catch(function(reason){
			window.alert(reason);
		}).then(callback);
	}
};
