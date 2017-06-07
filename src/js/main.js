var API_VERSION = "0.1.0";

//check for major updates
model.get("",{},function(response){
	if(response.version !== API_VERSION){
		console.log("out of sync!");
		//hard refresh page
		location.reload(true);
	} else {
		//run the app
		m.route(document.body, "/", {
			"/": Page,
		});
	}
});
