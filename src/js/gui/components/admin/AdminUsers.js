var AdminUsers = function(){

	vm.updateUserList();

	return {
		view: function(vnode){
			console.log("rendering");
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
				m(".admin-users.state-editable", [
					vm.userlist()
						//.filter(function(user){
						//	return user.node>-5;
						//})
						.sort(function(a,b){
							var nameA=a.user.value().toLowerCase(), nameB=b.user.value().toLowerCase();
							if(nameA < nameB) return -1;
							if(nameA > nameB) return 1;
							return 0;
						})
						.map(function(user){
							return m(AdminUser, {
								user: user
							});
						}),

					m(".admin-user.admin-adduser", m(".admin-user-value", {
						onclick: function(e){
							createnew.user();
						}
					}, "+ nieuwe gebruiker toevoegen"))
				])
			]);
		}
	};
};


var AdminUser = function(){

	return {
		view: function(vnode){
			var user = vnode.attrs.user;
			return m(".admin-user", [
				m(".admin-user-value", user.user.value()),
				m(".admin-user-value", user.name),
				m(".admin-user-value", (user.role===0) ? "Beheerder":""),
				m(".admin-user-button", {
					onclick: function(){
						vm.edit(user.user);
					}
				}, m(Icon, {name: "edit-white"})),
			]);
		}
	};
};
