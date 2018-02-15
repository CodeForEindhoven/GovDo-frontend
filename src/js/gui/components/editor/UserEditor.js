var UserEditor = function(){
	var user = ptrn("#"+vm.user().node);
	return {
		view: function(vnode){
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
					])
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
