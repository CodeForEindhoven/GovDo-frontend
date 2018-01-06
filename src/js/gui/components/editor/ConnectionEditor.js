var ConnectionEditor = function(){
	var selectedProgram;
	var selectedTask;

	return {
		view: function(vnode){
			return [

				//Selector of connections
				vnode.attrs.state ? m(".editor-connectionlist.box-editor-style", [
					//Programs
					m(".editor-connectionlist-list", [
						ptrn("program", function(program){
							return m(".editor-connectionlist-item.item-list",{
								class: ptrn.compare(selectedProgram, program)?"state-selected":"",
								onclick: function(){selectedProgram = program;}
							},[
								m(".editor-connectionlist-item-number", m(Numbering, {node: program})),
								m(".editor-connectionlist-item-name",program.value())
							]);
						})
					]),
					//Tasks
					m(".editor-connectionlist-list", [
						selectedProgram ? selectedProgram("task", function(task){
							return m(".editor-connectionlist-item.item-list",{
								class: ptrn.compare(selectedTask,task)?"state-selected":"",
								onclick: function(){
									selectedTask = task;

									if(vm.edit()("related").id() < 0){
										ptrn.createrelate("related", "", vm.edit());
									}

									ptrn.speculativeRelate(vm.edit()("related"), task);

									selectedProgram = undefined;
									selectedTask = undefined;
									vnode.attrs.onchange();
								}
							},[
								m(".editor-connectionlist-item-number",m(Numbering, {node: task})),
								m(".editor-connectionlist-item-name",task.value()),
								m("i.material-icons .connectionlist-addbutton", "add"),
							]);
						}) : []
					])
				]) : [],

				//list all the connections
				m(".editor-connections-parents", [
					vm.edit()("related task", function(parent){
						return m(".editor-connections-parent.state-selected",[
							m(Numbering, {node: parent, whole: true}),
							m(".editor-connections-parent-name.body-text", parent.value()),

							m("span.icon-button.editor-removefrom-list", [
								m("i.material-icons", {
									onclick: function(e){
										ptrn.speculativeUnrelate(vm.edit()("related"), parent);
										vnode.attrs.onchange();
									}
								},"close"),
								m("span.icon-button-hint", "Verwijderen")
							])
						]);
					}).emptyState(!vnode.attrs.state ? m(".editor-empty-list",[
						ArrayFromRange(0,1).map(function(i){
							return m(".editor-empty-list-item",[
								m(".editor-empty-list-item-number",""),
								m(".editor-empty-list-item-number",""),
								m(".editor-empty-list-item-number",""),
								m(".editor-empty-list-item-name"+(i%2===1?"-short":""),""),
								m(".editor-empty-list-item-delete",""),
							]);
						}),
						m(".button.button-empty-list", {
							onclick: vnode.attrs.onopen
						},"Gedeelde opgaven toevoegen")
					]):[]),
				])
			];
		}
	};
};
