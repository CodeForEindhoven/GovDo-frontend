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
						//m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "Indicator"),
								m(InfoBox, {
									content: "Een indicator geeft meetbaar aan of het doel gehaald wordt"
								}),
								m(".icons-header.icon-button", [
									m("i.material-icons", {
										onclick: function(e){
											ptrn.createrelate("kpi", "", vm.edit());
										}
									},"add")
								]),
							]),

							//m(TextArea, {
							//	value: vm.edit()("kpi").value(),
							//	onchange: function(v){
							//		vm.edit()("kpi").update(v);
							//	}
							//}),
							m(KPIEditor, {})
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

var KPIEditor = function(){

	return {
		view: function(vnode){
			return vm.edit()("kpi", function(kpi){
				return m(".kpiEdit",[
					m("span","- "),
					m("input.input kpi-input", {
						oninput: function(e){
							kpi.update(e.target.value);
						},
						onkeypress: function(e){
							if(e.keyCode===13){
								ptrn.createrelate("kpi", "", vm.edit());
							}
						},
						value: kpi.value()
					}),
					m("span.icon-button", [
						m("i.material-icons", {
							onclick: function(e){
								kpi.drop();
							}
						},"close"),
						m("span.icon-button-hint", "verwijderen")
					])
				]);
			});
		}
	};
};
