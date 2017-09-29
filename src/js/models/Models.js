var Models = {};

var temp_api = "http://api.test.planlab.wolkenmachine.nl/";

var model = {
	get: function(adress,data,callback){
		m.request({
			method: "GET",
			url: temp_api+adress
		}).catch(function(reason){
			window.alert(reason);
		}).then(callback);
	},

	post: function(adress,data,callback){
		m.request({
			method: "POST",
			url: temp_api+adress,
			data: data
		}).catch(function(reason){
			window.alert(reason);
		}).then(callback);
	},

	delete: function(adress,data,callback){
		m.request({
			method: "DELETE",
			url: temp_api+adress,
			data: data
		}).catch(function(reason){
			window.alert(reason);
		}).then(callback);
	}
};
