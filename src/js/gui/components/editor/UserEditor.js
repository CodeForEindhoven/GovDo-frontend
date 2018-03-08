var UserEditor = function(){
	var admin = (vm.user().role === 0);
	var userdata = vm.userlist().find(function(u){
		return u.node === vm.edit().id();
	});

	function save_edits(){
		console.log("save", userdata);
		if(admin && userdata){
			ptrn.updateuser(userdata.node, userdata.name, userdata.role, function(){
				vm.updateUserList();
			});
		}
	}

	return {
		onremove: function(){
			console.log("onbeforeremove");
			save_edits();
		},
		view: function(vnode){
			var user = vm.edit();
			return m(".efforteditor",[
				m(".editor-section",[
					m(".editor-section-title.title", "Beschrijving"),
					m(".editor-row.editor-title-editor",[
						//m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "Naam"),
								m(InfoBox, {
									content: "Je voornaam en achternaam"
								})
							]),
							m(TextArea, {
								value: user.value(),
								onchange: function(v){
									user.update(v);
								}
							}),
						//]),
					]),
					(admin && userdata) ? m(".editor-row.editor-title-editor",[
						m(".editor-subtitle", [
							m("span", "Email"),
							m(InfoBox, {
								content: "Email Adres"
							})
						]),
						m(TextArea, {
							value: userdata.name,
							onchange: function(v){
								userdata.name = v;
							}
						}),
					]) : [],
					(admin && userdata) ? m(".editor-row.editor-title-editor",[
						m(".editor-subtitle.subtitle", [
							m("span", "Type"),
							m(InfoBox, {
								content: m("ul", [
									m("li","Een routine is een activiteit die zich perodiek herhaalt."),
									m("li", "Een project heeft een begin en einde.")
								])
							})
						]),
						m(UserTypeEditor, {
							type: userdata.role,
							onchange: function(v){
								userdata.role = v;
							},
						}),
					]) : [],



				]),
				m(".editor-section",[
					m(".editor-section-title.title", "Contract"),
					m(".editor-row",[
						m(".editor-subtitle", [
							m(".editor-subtitle", [
								m("span", "Contract"),
								m(InfoBox, {
									content: "Je contract uren, en hoeveel daarvan inplanbaar zijn"
								})
							]),
							m("div",[
								m(NumberRoller, {
									value: parseInt(user("contract").value()),
									oninput: function(inpt){
										user("contract").update(inpt);
										m.redraw();
									}
								}),
								m("span", "uur per week, waarvan"),
								m(NumberRoller, {
									value: parseInt(user("plannable").value()),
									oninput: function(inpt){
										user("plannable").update(inpt);
										m.redraw();
									}
								}),
								m("span", "uur inplanbaar")
							])
						]),
					]),
				]),
			]);
		}
	};
};

var UserTypeEditor = function(){
	return {
		view: function(vnode){
			return m(".editor-typeselect", [
				["Gebruiker", "Beheerder"].map(function(t, count){
					return m(".editor-typeselect-type",{
						class: (vnode.attrs.type === count-1)? "state-selected": "",
						onclick: function(){
							vnode.attrs.onchange(count-1);
						}
					}, [
						m(".editor-typeselect-type-name", t),
						//m("i", {class:"material-icons hide-icon"}, "info_outline"),
					]);
				})
			]);
		}
	};
};
