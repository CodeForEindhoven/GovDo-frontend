var AdminPage = function(){
	var currentPage = 0;
	var currentFeedback = -1;
	return {
		view: function(vnode){
			return [
				m(".layout-optionbar", [
					m(".optionbar", [
						m(".optionbar-section", [
							m(".sub-navigation-label", "Persoonlijke Gegevens"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 0;},
								class: (currentPage===0)? "state-selected":""
							}, "Taaklijst"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 1;},
								class: (currentPage===1)? "state-selected":""
							}, "Contract"),
						]),

						(vm.user().role === 0) ? m(".optionbar-section", [
							m(".sub-navigation-label", "Functioneel Beheer"),
							m(".optionbar-option", {
								onclick: function(){currentPage = 2;},
								class: (currentPage===2)? "state-selected":""
							}, "Gebruikers"),
						]) : [],
					])
				]),
				m(".layout-workspace", [
					(currentPage===0) ? m(TodoList, {onfeedback: function(s){
						currentPage = 3;
						currentFeedback = s.value();
					}}) : [],
					(currentPage===1) ? m(TodoList) : [],
					(currentPage===2) ? m(AdminUsers) : [],
					(currentPage===3) ? m(Feedback, {
						session: currentFeedback,
						onsave: function(){
							currentPage = 0;
						}
					}) : [],
				])
			];
		}
	};
};
