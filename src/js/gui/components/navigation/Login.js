var Login = function(){

	var username = "";
	var password = "";
	var error = false;

	function verifyName(){
		ptrn.loginuser(username, function(succes){
			if(succes){
				error = false;
				vm.login(2);
			} else {
				error = true;
			}
			m.redraw();
		});
	}

	function verifyPass(){
		ptrn.loginpass(username, password, function(succes, node, role, token){
			if(succes){
				error = false;
				vm.login(0);
				vm.user({
					user:username,
					node: node,
					role: role,
					token: token
				});

				ptrn.onload(function(){
					vm.person(ptrn("person"));
				});
				
			} else {
				error = true;
			}
			m.redraw();
		});
	}

	return {
		view: function(vnode){
			return vm.login() > 0 ? m(".login",[
				m(".login-overlay-fullscreen"),
				m(".login-popup", [
					m(".login-popup-title.title", "Hallo! Welkom bij Planlab 🙋"),
					(function(){
						if(vm.login() === 1){
							return [
								m("input.login-popup-email", {
									type: "email",
									name: "email",
									placeholder: "E-mail adres",
									oninput: m.withAttr("value", function(v) {username = v;}),
									onchange: m.withAttr("value", function(v) {username = v;}),
									onkeydown: function(e){
										if(e.keyCode===13){
											verifyName();
										}
									},
									value: username
								}),
								(error) ? m(".login-popup-error-message.body-text", "Onbekend email adres") : [],
								//m(".login-popup-message.body-text", "Vul uw e-mailadres in om het wachtwoord te ontvangen"),

								m(".login-buttons", [
									m(".button", {
										onclick: function(){
											verifyName();
										}
									},"Verder"),

									m(".button", {
										onclick: function(){
											vm.login(1);
											username = "";
										}
									},"Annuleer"),
								]),
							];
						} else if(vm.login() === 2){
							return [
								m(".login-popup-email", username),
								m(".login-popup-message.body-text", "We hebben u een email gestuurd met een tijdelijk wachtwoord. Controleer alstublieft uw inbox."),
								m("input.login-popup-email", {
									placeholder: "Uw tijdelijke wachtwoord",
									oninput: m.withAttr("value", function(v) {password = v;}),
									onchange: m.withAttr("value", function(v) {password = v;}),
									onkeydown: function(e){
										if(e.keyCode===13){
											verifyPass();
										}
									},
									value: password
								}),
								(error) ? m(".login-popup-error-message.body-text", "Dit wachtwoord is onbekend, probeer opnieuw...") : [],

								m(".login-buttons", [
									m(".button", {
										onclick: function(){
											verifyPass();
										}
									},"Inloggen"),

									m(".button", {
										onclick: function(){
											username = "";
											password = "";
											vm.login(1);
										}
									},"Annuleer"),
								]),
							];
						}
					})(),
					m(".login-popup-forgotten", ["Kan je niet inloggen? Neem contact op met ", m("a", {href: "mailto:planlab@eindhoven.nl"},"planlab@eindhoven.nl")]),
				])
			]) : [];
		}
	};
};
