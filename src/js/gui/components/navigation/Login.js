var Login = function(){

	var username = "";
	var password = "";
	var error = false;

	return {
		view: function(vnode){
			return vm.login() > 0 ? m(".login",[
				m(".login-overlay-fullscreen"),
				m(".login-popup", [
					m(".login-popup-title.title", "Welkom bij Planlab"),
					(function(){
						if(vm.login() === 1){
							return [
								m("input.login-popup-email", {
									placeholder: "E-mail adres",
									oninput: m.withAttr("value", function(v) {username = v;}),
									onchange: m.withAttr("value", function(v) {username = v;}),
									value: username
								}),
								m(".login-popup-message.body-text", "Vul uw e-mailadres in om het wachtwoord te ontvangen"),
								(error) ? m(".login-popup-error-message.body-text", "Onbekend email adres") : [],

								m(".login-buttons", [
									m(".button", {
										onclick: function(){
											if(username==="admin"){
												error = false;
												vm.login(2);
											} else {
												error = true;
											}
										}
									},"Verder"),

									m(".button", {
										onclick: function(){
											vm.login(-1);
										}
									},"Anuleer"),
								]),
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
								m(".login-popup-message.body-text", "Kopieer het tijdelijke wachtwoord uit uw email."),
								(error) ? m(".login-popup-error-message.body-text", "Onbekend wachtwoord") : [],

								m(".login-buttons", [
									m(".button", {
										onclick: function(){
											if(password==="test"){
												error = false;
												vm.login(0);
												vm.user({user:username,pass:password});
											} else {
												error = true;
											}
										}
									},"Inloggen"),

									m(".button", {
										onclick: function(){
											vm.login(-1);
										}
									},"Anuleer"),
								]),
							];
						}
					})(),
					m(".login-popup-forgotten", "Kan je niet inloggen? Neem contact op met de administrator..."),
				])
			]) : [];
		}
	};
};
