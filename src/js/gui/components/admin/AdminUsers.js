var AdminUsers = function(){
	var users = [];
	var editmode = false;

	function onchange(){
		ptrn.getusers(function(resp){
			users = resp;
			editmode = false;
			m.redraw();
		});
	}
	onchange();

	return {
		view: function(vnode){
			return m(".admin",[
				m(".admin-header",[
					m(".admin-title.subtitle", [
						m("span", "Gebruikers"),
						m(InfoBox, {
							content: m("",[
								m("span", "Gebruikers kunnen inloggen met de onderstaande email adressen"),
							])
						})
					]),

					m(".icons-header", [
						m("i.material-icons", {
							onclick: function(e){
								
							}
						},"add")
					]),

				]),
				m(".admin-labels",[
					m(".admin-label", "Naam"),
					m(".admin-label", "Email"),
					m(".admin-label", "Rol"),
				]),
				m(".admin-users",{
					class: editmode ? "state-editing": "state-editable",
				}, users.map(function(user){
					return m(AdminUser, {
						user: user,
						onchange: onchange,
						onedit: function(){
							editmode = true;
						}
					});
				}))
			]);
		}
	};
};

/*
.sort(function(a,b){
	var an = ptrn("#"+a.node).value();
	var bn = ptrn("#"+b.node).value();
	if(an < bn) return -1;
	if(an > bn) return 1;
	return 0;
})
*/

var AdminUser = function(){
	var edit = false;
	var tempmail, temprole;

	return {
		view: function(vnode){
			var user = vnode.attrs.user;
			if(tempmail===undefined) tempmail = user.name;
			if(temprole===undefined) temprole = user.role;

			return edit ? m(".admin-user-edit", [
				m("input.input.admin-user-value", {
					placeholder: "Naam",
					oninput: m.withAttr("value", function(v) {ptrn("#"+user.node).update(v);}),
					onchange: m.withAttr("value", function(v) {ptrn("#"+user.node).update(v);}),
					value: ptrn("#"+user.node).value()
				}),
				m("input.input.admin-user-value", {
					placeholder: "Email",
					oninput: m.withAttr("value", function(v) {tempmail = v;}),
					onchange: m.withAttr("value", function(v) {tempmail = v;}),
					value: tempmail
				}),
				m(".admin-user-value", m(DropDown, {
					value: temprole,
					options: ["Beheerder"],
					novalue: "Gebruiker",
					onchange: function(e){
						temprole = e;
					}
				})),
				//m(".admin-user-value", (user.role===1)?"Beheerder":""),
				m(".admin-user-button", {
					onclick: function(){
						ptrn.updateuser(user.node, tempmail, temprole, vnode.attrs.onchange);
						ptrn.transact();
						edit = false;
					}
				}, "Opslaan"),
			]) : m(".admin-user", [
				m(".admin-user-value", ptrn("#"+user.node).value()),
				m(".admin-user-value", user.name),
				m(".admin-user-value", (user.role===0)?"Beheerder":""),
				m(".admin-user-button", {
					onclick: function(){
						edit = true;
						vnode.attrs.onedit();
					}
				}, "Bewerk"),
			]);
		}
	};
};
