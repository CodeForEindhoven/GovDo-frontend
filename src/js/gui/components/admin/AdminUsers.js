var AdminUsers = function(){
	var users = [];
	var editmode = false;
	var editing = -1;
	var scrolldown = false;

	function adduser(){
		ptrn.create("person", "", function(u){
			ptrn.adduser(u.id(), function(){
				editing = u.id();
				editmode = true;
				scrolldown = true;
				redrawlist();
			});

		});
	}

	function redrawlist(){
		ptrn.getusers(function(resp){
			users = resp;
			m.redraw();
		});
	}
	redrawlist();

	return {
		view: function(vnode){
			return m(".admin",[
				m(".admin-header",[
					m(".admin-title.subtitle", [
						m("span", "Gebruikers")
					]),

					m(".icons-header", [
						m("i.material-icons", {
							onclick: function(e){
								adduser();
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
					onupdate: function(vnode){
						if(scrolldown){
							vnode.dom.scrollTop = vnode.dom.scrollHeight;
							scrolldown = false;
						}
					}
				}, users.filter(function(user){
					return user.node>-5;
				}).map(function(user){
					return m(AdminUser, {
						editing: editing,
						user: user,
						onchange: function(){
							editmode = false;
							editing = -1;
							redrawlist();
						},
						onedit: function(id){
							editmode = true;
							editing = id;
						}
					});
				}))
			]);
		}
	};
};


var AdminUser = function(){
	var edit = false;
	var tempmail, temprole;

	return {
		view: function(vnode){
			var user = vnode.attrs.user;
			if(tempmail===undefined) tempmail = user.name;
			if(temprole===undefined) temprole = user.role;
			edit = (vnode.attrs.editing === user.node);

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
						//edit = false;
					}
				}, "Opslaan"),
			]) : m(".admin-user", [
				m(".admin-user-value", ptrn("#"+user.node).value()),
				m(".admin-user-value", user.name),
				m(".admin-user-value", (user.role===0) ? "Beheerder":""),
				m(".admin-user-button", {
					onclick: function(){
						//edit = true;
						vnode.attrs.onedit(user.node);
					}
				}, m(Icon, {name: "edit-white"})),
			]);
		}
	};
};
