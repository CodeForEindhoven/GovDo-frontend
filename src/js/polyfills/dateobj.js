function DateObj(){}

DateObj.prototype.value = "";
DateObj.prototype.today = function(){
	var d = new Date();
	this.value = d.getFullYear()+d.getMonth()+d.getDate();
};
