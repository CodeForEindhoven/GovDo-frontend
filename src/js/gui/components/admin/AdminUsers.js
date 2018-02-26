var AdminUsers = function(){
	//var users = [];
	var editmode = false;
	var editing = -1;
	var scrolldown = false;

	function adduser(){
		ptrn.create("person", "", function(u){
			ptrn.createrelate("role", "leader", u);
			ptrn.createrelate("role", "aclient", u);
			ptrn.createrelate("role", "bclient", u);
			ptrn.createrelate("contract", "40", u);
			ptrn.createrelate("plannable", "40", u);
			ptrn.transact(function(){
				ptrn.adduser(u.id(), function(){
					//editing = u.id();
					//editmode = true;
					//scrolldown = true;
					vm.updateUserList(function(){
						vm.edit(u);
					});
				});
			});
		});

//		ptrn.create("person", "", function(u){
//			ptrn.adduser(u.id(), function(){
//				ptrn.createrelate("role", "leader", u);
//				ptrn.createrelate("role", "aclient", u);
//				ptrn.createrelate("role", "bclient", u);
//				ptrn.createrelate("contract", "40", u);
//				ptrn.createrelate("plannable", "40", u);
//				editing = u.id();
//				editmode = true;
//				scrolldown = true;
//				redrawlist();
//			});
//		});
	}

	/*function redrawlist(){
		ptrn.getusers(function(resp){
			users = resp;
			m.redraw();
		});
	}
	redrawlist();*/
	vm.updateUserList();


	return {
		view: function(vnode){
			return m(".admin",[
				m(".admin-header",[
					m(".admin-title.subtitle", [
						m("span", "Gebruikers")
					]),

					//m(".icons-header", [
					//	m("i.material-icons", {
					//		onclick: function(e){
					//			adduser();
					//		}
					//	},"add")
					//]),

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
				}, [
					vm.userlist().filter(function(user){
						return user.node>-5;
					}).sort(function(a,b){
						//return  - ptrn("#"+b.node).value();
						var nameA=ptrn("#"+a.node).value().toLowerCase(), nameB=ptrn("#"+b.node).value().toLowerCase();
						if(nameA < nameB) return -1;
						if(nameA > nameB) return 1;
						return 0;
					}).map(function(user){
						return m(AdminUser, {
							editing: editing,
							user: user,
							onchange: function(){
								//editmode = false;
								//editing = -1;
								vm.updateUserList();
							},
							onedit: function(id){
								//editmode = true;
								//editing = id;
							}
						});
					}),

					m(".admin-user.admin-adduser", m(".admin-user-value", {
						onclick: function(e){
							adduser();
						}
					}, "+ nieuwe gebruiker toevoegen"))
				])
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
			edit = (vnode.attrs.editing === user.node);

			return m(".admin-user", [
				m(".admin-user-value", ptrn("#"+user.node).value()),
				m(".admin-user-value", user.name),
				m(".admin-user-value", (user.role===0) ? "Beheerder":""),
				m(".admin-user-button", {
					onclick: function(){
						vm.edit(ptrn("#"+user.node));
					}
				}, m(Icon, {name: "edit-white"})),
			]);
		}
	};
};
