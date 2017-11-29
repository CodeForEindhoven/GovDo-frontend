var TaskEditor = function(){
	return {
		view: function(vnode){
			return m(".efforteditor",[
				m(".editor-section",[
					m(".editor-section-title.title", "Beschrijving"),
					m(".editor-row",[
						m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "Opgave titel"),
								m(InfoBox, {
									content: "Een opgave is een doel"
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
								m("span", "Door"),
								m(InfoBox, {
									content: "Hoe wordt dit doel bereikt?"
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
						m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "Indicator"),
								m(InfoBox, {
									content: "Een indicator geeft meetbaar aan of het doel gehaald wordt"
								})
							]),

							m(TextArea, {
								value: vm.edit()("kpi").value(),
								onchange: function(v){
									vm.edit()("kpi").update(v);
								}
							}),
						]),
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
