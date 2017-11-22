var ProgramEditor = function(){
	return {
		view: function(vnode){
			return m(".efforteditor",[
				m(".editor-section",[
					m(".editor-section-title.title", "Beschrijving"),
					m(".editor-row",[
						m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "Programma titel"),
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
								m("span", "Categorie"),
								m(InfoBox, {
									content: "Betreft het een horizontaal of een verticaal programma?"
								})
							]),
							m(ProgramTypeEditor, {
								selected: vm.edit()("domain"),
								onchange: function(domain){
									if(domain){
										ptrn.speculativeUnrelate(vm.edit(), vm.edit()("domain"));
										ptrn.speculativeRelate(vm.edit(), domain);
									}
								},
							}),
						])
					]),
					m(".editor-row",[
						m(".editor-column",[
							m(".editor-subtitle", [
								m("span", "Missie"),
								m(InfoBox, {
									content: "Wat is de missie van dit programma?"
								})
							]),
							m(TextArea, {
								value: vm.edit()("mission").value(),
								onchange: function(v){
									vm.edit()("mission").update(v);
								}
							}),
						])
					])
				]),
			]);
		}
	};
};


var ProgramTypeEditor = function(){
	return {
		view: function(vnode){
			return m(".editor-typeselect", [
				ptrn("domain", function(t){
					return m(".editor-typeselect-type", {
						class: (ptrn.compare(vnode.attrs.selected,t)) ? "state-selected": "",
						onclick: function(){
							vnode.attrs.onchange(t);
						}
					}, [
						m(".editor-typeselect-type-name", t.value()),
						//m("i", {class:"material-icons hide-icon"}, "info_outline"),
					]);
				})
			]);
		}
	};
};
