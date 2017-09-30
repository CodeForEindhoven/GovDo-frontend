function perfomancetest(callback){
	var t0 = performance.now();
	callback();
	var t1 = performance.now();
	return t1-t0;
}
