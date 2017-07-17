Array.prototype.emptyState = function(element){
	var O = Object(this);
	if(O.length === 0){
		return element;
	} else {
		return O;
	}
};

String.prototype.emptyState = function(element){
	var O = String(this);
	if(O.length === 0){
		return element;
	} else {
		return O;
	}
};

var emptyState = function(test, element){
	if(test) {
		return test;
	} else {
		return element;
	}
};
