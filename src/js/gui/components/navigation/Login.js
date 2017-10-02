var Login = function(){

	var username = "";
	var password = "";

	return {
		view: function(vnode){
			return vm.login() > 0 ? m(".login",[
				m(".login-overlay-fullscreen"),
				m(".login-popup", [
					m(".login-popup-title", "Welkom bij Planlab"),
					(function(){
						if(vm.login() === 1){
							return [
								m("input.login-popup-email", {
									placeholder: "E-mail adres",
									oninput: m.withAttr("value", function(v) {username = v;}),
									onchange: m.withAttr("value", function(v) {username = v;}),
									value: username
								}),
								m(".login-popup-message", "Vul uw e-mailadres in om het wachtwoord te ontvangen"),

								m(".button", {
									onclick: function(){
										if(username==="admin"){
											vm.login(2);
										}
									}
								},"Verder"),

								m(".button", {
									onclick: function(){
										vm.login(-1);
									}
								},"Anuleer"),
							];
						} else if(vm.login() === 2){
							return [
								m(".login-popup-email", username),
								m("input.login-popup-email", {
									placeholder: "Wachtwoord",
									oninput: m.withAttr("value", function(v) {password = v;}),
									onchange: m.withAttr("value", function(v) {password = v;}),
									value: password
								}),
								m(".login-popup-message", "Kopieer het tijdelijke wachtwoord uit uw email."),

								m(".button", {
									onclick: function(){
										if(password==="test"){
											vm.login(0);
											vm.user({user:username,pass:password});
										}
									}
								},"Inloggen"),

								m(".button", {
									onclick: function(){
										vm.login(-1);
									}
								},"Anuleer"),
							];
						}
					})(),
					m(".login-popup-forgotten", "Kan je niet inloggen? Neem contact op met de administrator..."),
				])
			]) : [];
		}
	};
};
