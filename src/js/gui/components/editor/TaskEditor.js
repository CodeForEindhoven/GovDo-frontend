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

var KPIEditor = function(){
	return {
		view: function(vnode){
			return vm.edit()("kpi", function(kpi){
				return m(".kpiEdit",[
					m("span","- "),
					m(TextArea, {
						value: kpi.value(),
						onchange: function(v){
							kpi.update(v);
						}
					}),
					//m("input.input kpi-input", {
					//	placeholder: "Indicator titel invoeren",
					//	onkeydown: function(e) {kpi.update(e.target.value);},
					//	onkeyup: function(e) {kpi.update(e.target.value);},
					//	//onkeypress: function(e){
					//	//	if(e.keyCode===13){
					//	//		ptrn.createrelate("kpi", "", vm.edit());
					//	//	}
					//	//},
					//	value: kpi.value()
					//}),
					m("span.icon-button", [
						m("i.material-icons", {
							onclick: function(e){
								kpi.drop();
							}
						},"close"),
						m("span.icon-button-hint", "Verwijderen")
					])
				]);
			}).emptyState(!vnode.attrs.state ? m(".editor-empty-list",[
				ArrayFromRange(0,3).map(function(i){
					return m(".editor-empty-list-item",[
						m(".editor-empty-list-item-name"+(i%2===1?"-short":""),""),
						m(".editor-empty-list-item-label",""),
						m(".editor-empty-list-item-label",""),
						m(".editor-empty-list-item-delete",""),
					]);
				}),
				m(".button.button-empty-list", {
					onclick: vnode.attrs.onadd
				},"Indicator toevoegen")
			]):[]);
		}
	};
};
