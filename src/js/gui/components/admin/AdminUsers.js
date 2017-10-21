var AdminUsers = function(){
	var users = [];
	ptrn.getusers(function(resp){
		users = resp;
		m.redraw();
	});
	return {
		view: function(vnode){
			return m(".admin",[
				m(".admin-labels",[
					m(".admin-label", "naam"),
					m(".admin-label", "email"),
					m(".admin-label", "rol"),
				]),
				m(".admin-users", users.map(function(user){
					return m(".admin-user", [
						m(".admin-user-value", ptrn("#"+user.node).value()),
						m(".admin-user-value", user.name),
						m(".admin-user-value", (user.role===1)?"Beheerder":""),
					]);
				}))
			]);
		}
	};
};
