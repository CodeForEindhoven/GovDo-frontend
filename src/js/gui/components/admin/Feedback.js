var Feedback = function(){
	var currentEffort;
	var feedbackid = "-1";
	var scrolltotop = false;
	var save = false;

	function setCurrentEffort(eff){
		currentEffort = eff;
		//if this effort does not have feedback yet
		if(currentEffort("feedback:"+feedbackid).id()===-1){
			ptrn.createrelate("feedback", feedbackid, currentEffort, function(feedback){

				ptrn.createrelate("positives", "", feedback, function(){
					ptrn.createrelate("negatives", "", feedback, function(){

					ptrn.createrelate("effects", "", feedback, function(e){
						ptrn.createrelate("explanation", "", e, function(){});
					});

					ptrn.createrelate("products", "", feedback, function(e){
						ptrn.createrelate("explanation", "", e, function(){});
					});

					ptrn.createrelate("planning", "", feedback, function(e){
						ptrn.createrelate("explanation", "", e, function(){});
					});

					ptrn.createrelate("stakeholders", "", feedback, function(e){
						ptrn.createrelate("explanation", "", e, function(){});
					});

					ptrn.createrelate("conditions", "", feedback, function(e){
						ptrn.createrelate("explanation", "", e, function(){});
					});

					});
				});
			});
		}
	}

	function next(){

		var list = ptrn("#"+vm.user().node+" role:leader effort type:0 effort", function(effort){return effort;});
		var currentindex = list.map(function(effort){
			return effort.id();
		}).indexOf(currentEffort.id());



		if((currentindex+1)<list.length){
			scrolltotop = true;
			setCurrentEffort(list[currentindex+1]);
		} else {
			scrolltotop = true;
			save = true;
		}

	}

	return {
		view: function(vnode){
			feedbackid = vnode.attrs.session;

			if(currentEffort===undefined){
				setCurrentEffort(ptrn("#"+vm.user().node+" role:leader effort type:0 effort"));
			}

			return m(".admin",[
				m(".admin-header",[
					m(".admin-title.subtitle", [
						m("span", "Voortgangs Rapportage")
					]),
				]),

				m(".admin-feedback",[
					m(".admin-feedback-list.layout-thincolumn",[
						ptrn("#"+vm.user().node+" role:leader effort type:0 effort", function(effort){
							return m(".admin-feedback-list-effort",{
								onclick: function(){
									scrolltotop = true;
									save = false;
									setCurrentEffort(effort);
									ptrn.transact();
								}
							}, [
								m(Numbering, {
									node: effort, whole: true,
									selected: (!save) && ptrn.compare(currentEffort, effort),
									disabled: (effort("feedback:"+feedbackid).id()===-1)
								}),
								m(".admin-feedback-list-effort-name", effort.value()),
							]);
						}),
						m(".admin-feedback-list-done", {
							class: save? "state-selected":"",
							onclick: function(){
								save = true;
							}
						}, "opslaan en verzenden")
					]),


					//feedback questions
					m(".admin-feedback-questions.layout-thickcolumn",{
						onupdate: function(vnode){
							if(scrolltotop){
								scrolltotop = false;
								vnode.dom.scrollTop = 0;
							}
						}
					}, (!save) ? [
						m(".editor-section",[
							m(".editor-section-title.title", "Algemene Toelichting"),
							m(".editor-row",[
								//m(".editor-column",[
								//	m(".editor-subtitle.subtitle", [
								//		m("span", "Welke Producten worden afgerond de komende 2 weken?"),
								//	]),
								//]),
								m(".editor-column",[
									m(".editor-subtitle.subtitle", [
										m("span", "Waarover maak jij je zorgen? Wat gaat er minder goed?"),
									]),
									m(TextArea, {
										value: currentEffort("feedback:"+feedbackid+" positives").value(),
										onchange: function(v){
											currentEffort("feedback:"+feedbackid+" positives").update(v);
										}
									}),
									m(".editor-subtitle.subtitle", [
										m("span", "Waar ben je trots op? Wat gaat goed?"),
									]),
									m(TextArea, {
										value: currentEffort("feedback:"+feedbackid+" negatives").value(),
										onchange: function(v){
											currentEffort("feedback:"+feedbackid+" negatives").update(v);
										}
									}),
								]),
							]),
						]),

						//3 choice questions
						m(".editor-section",[
							m(".editor-section-title.title", "Voortgang"),
							m(FeedbackQuestion, {currentFeedback: currentEffort("feedback:"+feedbackid), label: "Effect", name: "effects"}),
							m(FeedbackQuestion, {currentFeedback: currentEffort("feedback:"+feedbackid), label: "Producten", name: "products"}),
							m(FeedbackQuestion, {currentFeedback: currentEffort("feedback:"+feedbackid), label: "Planning", name: "planning"}),
							m(FeedbackQuestion, {currentFeedback: currentEffort("feedback:"+feedbackid), label: "Stakeholders", name: "stakeholders"}),
							m(FeedbackQuestion, {currentFeedback: currentEffort("feedback:"+feedbackid), label: "Randvoorwaarden", name: "conditions"}),
						]),

						m(".editor-section",[
							m(".save-button", {
								onclick: function(){
									ptrn.transact();
									next();
								}
							}, "Verder"),
						]),
					] : [
						m(".editor-section",[
							m(".editor-section-title.title", "Je hebt de voortgangsrapportage ingevuld."),
							m(".save-button", {
								onclick: function(){
									vnode.attrs.onsave();
								}
							}, "Opslaan"),
						]),
					])
				])
			]);
		}
	};
};

var FeedbackQuestion = function(){

	return {
		view: function(vnode){
			var currentFeedback = vnode.attrs.currentFeedback;

			return m(".editor-row",[
				m(".editor-column",[
					m(".editor-subtitle.subtitle", [
						m("span", vnode.attrs.label),
					]),
					m(MultipleChoice, {
						value: currentFeedback(vnode.attrs.name).value(),
						onchange: function(v){
							currentFeedback(vnode.attrs.name).update(v);
						}
					}),
					m(".admin-feedback-questions-info", "lorum-ipusum")
				]),
				m(".editor-column",[
					m(".editor-subtitle.subtitle", [
						m("span", "Toelichting"),
					]),
					m(TextArea, {
						value: currentFeedback(vnode.attrs.name+" explanation").value(),
						onchange: function(v){
							currentFeedback(vnode.attrs.name+" explanation").update(v);
						}
					}),
				])
			]);
		}
	};
};
