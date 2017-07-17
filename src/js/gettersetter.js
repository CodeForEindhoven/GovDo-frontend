var getset = function(object){
	var scopedObject = {};
	for(var key in object){
		if (!object.hasOwnProperty(key)) continue;
		scopedObject[key] = function(value){
			if(value){object[key]=value;}
			return object[key];
		};
	}

	return scopedObject;
};
