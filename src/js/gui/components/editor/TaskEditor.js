var TaskEditor = function(){
	return {
		view: function(vnode){
			return m(".efforteditor",[
				m(".editor-section",[
					m(".editor-section-title.title", "Beschrijving"),
					m(".editor-row.editor-title-editor",[
						m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "Opgave titel"),
								m(InfoBox, {
									content: "Een opgave, doel of 'wolkje'"
								})
							]),
							m(TextArea, {
								value: vm.edit().value(),
								onchange: function(v){
									vm.edit().update(v);
								}
							}),
						]),
						m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "door..."),
								m(InfoBox, {
									content: "Je opgave wordt geformuleerd als '... door ...'."
								})
							]),
							m(TextArea, {
								value: vm.edit()("means").value(),
								onchange: function(v){
									vm.edit()("means").update(v);
								}
							}),
						])
					])
				]),
				m(".editor-section",[
					m(".editor-section-title.title", "Resultaten"),
					m(".editor-row",[
						//m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "Indicator"),
								m(InfoBox, {
									content: "Een indicator geeft meetbaar aan of het doel gehaald wordt"
								}),

								m("span.icon-button.icons-header", [
									m("span.icon-button-hint", "Nieuwe indicator toevoegen"),
									m("i.material-icons", {
										onclick: function(e){
											ptrn.createrelate("kpi", "", vm.edit());
										}
									},"add"),
								])
							]),
							m(KPIEditor, {onadd: function(e){
								ptrn.createrelate("kpi", "", vm.edit());
							}})
						//]),
					]),
				]),

				m(".editor-section.editor-section-end",[
					//m(".status-content",[
					//	m(Toggle, {
					//		value: parseInt(vm.edit()("mode").value()),
					//		label_sketch: "Voorstel",
					//		label_definitive: "Goedgekeurd",
					//		onchange: function(v){
					//			vm.edit()("mode").update(v);
					//		}
					//	}),
					//]),
				]),
			]);
		}
	};
};
