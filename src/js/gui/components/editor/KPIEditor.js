
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
