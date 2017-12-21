var EffortEditor = function(){
	var stateTeam = false;
	var stateClient = false;
	var state2 = false;
	return {
		view: function(vnode){
			return m(".efforteditor",[

				m(".editor-section",[
					m(".editor-section-title.title", "Beschrijving"),

					m(".editor-row",[
						m(".editor-column.editor-title-editor",[
							m(".editor-subtitle.subtitle", [
								m("span", "Inspanning titel"),
								m(InfoBox, {
									content: "Kies een korte en herkenbare titel"
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
							m(".editor-subtitle.subtitle", [
								m("span", "Type"),
								m(InfoBox, {
									content: m("ul", [
										m("li","Een routine is een activiteit die zich perodiek herhaalt."),
										m("li", "Een project heeft een begin en einde.")
									])
								})
							]),


							m(TypeEditor, {
								type: parseInt(vm.edit()("type").value()),
								onchange: function(v){
									vm.edit()("type").update(v);
								},
							}),
						]),
					]),

					m(".editor-row",[
						m(".editor-column",[
							m(".editor-subtitle.subtitle", [
								m("span", "Beoogd Effect"),
								m(InfoBox, {
									content: m("",[
										m("span", "Datgene wat uiteindelijk bereikt wordt, bijvoorbeeld:"),
										m("ul", [
											m("li","vermindering armoede"),
											m("li", "...")
										])
									])
								})
							]),

							m(TextArea, {
								value: vm.edit()("description").value(),
								onchange: function(v){
									vm.edit()("description").update(v);
								},
							}),
						]),

						m(".editor-column",[
							m(".editor-subtitle.subtitle", [
								m("span", "Eindproduct"),
								m(InfoBox, {
									content: m("",[
										m("span", "Datgene wat uiteindelijk wordt opgeleverd, bijvoorbeeld:"),
										m("ul", [
											m("li","Een rapport"),
											m("li", "...")
										])
									])
								})
							]),

							m(TextArea, {
								value: vm.edit()("endproduct").value(),
								onchange: function(v){
									vm.edit()("endproduct").update(v);
								},
							}),
						]),
					]),
				]),

				//Positionering
				m(".editor-section",[
					m(".editor-section-title.title", "Positionering"),

					m(".editor-subtitle-header",[
						m(".editor-subtitle.subtitle", [
							m("span", "Gerelateerde opgaven"),
							m(InfoBox, {
								content: m("",[
									m("span", "Als een inspanning gedeeld wordt door meerdere programma's kun je dat hier aangeven"),
								])
							})
						]),

						m("span.icon-button.icons-header", [
							m("span.icon-button-hint", state2 ? "Toevoegen annuleren" : "Inspanning aan andere opgave verbinden"),
							m("i.material-icons", {
								onclick: function(e){
									state2 = !state2;
								}
							}, state2 ? "close" : "add" ),
						])
					]),
					m(ConnectionEditor, {
						state: state2,
						onopen: function(){
							state2 = true;
						},
						onchange: function(){
							state2 = false;
						}
					}),
				]),

				//Planning
				m(".editor-section",[
					m(".editor-section-title.title", "Planning"),
					m(".editor-subtitle.subtitle", [
						m("span", "Periode"),
						m(InfoBox, {
							content: m("",[
								m("span", "Als er geen precieze datum bekend is, geef dan alleen een schatting"),
							])
						})
					]),

					m(".editor-selection-date",[
						m("span.body-text", "van"),
						m(DatePicker,{
							value: vm.edit()("startdate").value(),
							onchange: function(e){
								console.log("update: "+e);
								vm.edit()("startdate").update(e);
							}
						})
					]),

					m(".editor-selection-date",[
						m("span.body-text", "t/m"),
						m(DatePicker,{
							value: vm.edit()("enddate").value(),
							onchange: function(e){
								console.log("update: "+e);
								vm.edit()("enddate").update(e);
							}
						})
					]),

					//m(".editor-section-totals", FuzzyDate.toWeekRange(vm.edit()("startdate").value(),vm.edit()("enddate").value())[0]),
					//m(".editor-section-totals", FuzzyDate.toWeekRange(vm.edit()("startdate").value(),vm.edit()("enddate").value())[1])
				]),


				//Mensen
				m(".editor-section",[
					m(".editor-section-title.title", "Mensen"),

					//Opdrachtgevers
					m(".editor-subtitle-header",[
							m(".editor-subtitle.subtitle", [
								m("span", "Opdrachtgevers"),
								m(InfoBox, {
									content: m("",[
										m("span", "Bestuurlijk en Ambtelijk Opdrachtgevers"),
									])
								})
							]),

						m("span.icon-button.icons-header", [
							m("span.icon-button-hint", stateClient ? "Toevoegen annuleren" : "Opdrachtgever toevoegen"),
							m("i.material-icons", {
								onclick: function(e){
									stateClient = !stateClient;
								}
							}, stateClient ? "close" : "add" ),
						])
					]),

					m(PeopleListEditor, {
						classname: "client-editor",
						peoplelist: vm.edit()("role:aclient person", function(a){return a;}).concat(vm.edit()("role:bclient person", function(a){return a;})),
						roles: {
							selected: function(person){
								return (person("role:bclient #"+vm.edit().id()).id()>0) ? 0 : -1;
							},
							options:["Bestuurlijk Opdrachtgever"],
							novalue: "Ambtelijk Opdrachtgever",
							onchange: function(e, p){
								if(e===0){
									ptrn.speculativeUnrelate(vm.edit(), p("role:aclient"));
									ptrn.speculativeRelate(vm.edit(), p("role:bclient"));
								} else {
									ptrn.speculativeUnrelate(vm.edit(), p("role:bclient"));
									ptrn.speculativeRelate(vm.edit(), p("role:aclient"));
								}
							},
						},
						emptystate: "Opdrachtgevers toevoegen",
						onopen: function(){
							stateClient = true;
						},
						onadd: function(p){
							if(vm.edit()("role:bclient #"+p.id()).id() < 0){
								ptrn.speculativeRelate(vm.edit(), p("role:aclient"));
							}
							stateClient = false;
						},
						ondelete: function(p){
							if((p("role:aclient #"+vm.edit().id()).id()>0)){
								ptrn.speculativeUnrelate(vm.edit(), p("role:aclient"));
							} else {
								ptrn.speculativeUnrelate(vm.edit(), p("role:bclient"));
							}
						},
						state: stateClient
					}),


					//Team
					m(".editor-subtitle-header",[
							m(".editor-subtitle.subtitle", [
								m("span", "Team"),
								m(InfoBox, {
									content: m("",[
										m("span", "Alle mensen die meewerken aan deze inspanning. Een persoon is de trekker."),
									])
								})
							]),

						m("span.icon-button.icons-header", [
							m("span.icon-button-hint", stateTeam ? "Toevoegen annuleren" : "Teamlid toevoegen"),
							m("i.material-icons", {
								onclick: function(e){
									stateTeam = !stateTeam;
								}
							}, stateTeam ? "close" : "add" ),
						])
					]),

					m(PeopleListEditor, {
						classname: "team-editor",
						state: stateTeam,
						peoplelist: vm.edit()("person", function(a){return a;}),
						roles: {
							selected: function(person){
								return (person("role:leader #"+vm.edit().id()).id()>0) ? 0 : -1;
							},
							options:["Trekker"],
							novalue: "Teamlid",
							onchange: function(e, p){
								if(e===0){
									ptrn.speculativeRelate(vm.edit(), p("role:leader"));
								} else {
									ptrn.speculativeUnrelate(vm.edit(), p("role:leader"));
								}
							},
						},
						emptystate: "Team samenstellen",
						onopen: function(){
							stateTeam = true;
						},
						onadd: function(v){
							if(vm.edit()("#"+v.id()).id() < 0){
								ptrn.speculativeRelate(vm.edit(), v);

								//if there were not previous hours
								if(vm.edit()("hours #"+v.id()).id() < 0){
									ptrn.create("hours", "~/_/_-~/_/_-0-~-w-0-w", function(newhours){
										ptrn.speculativeRelate(newhours, vm.edit());
										ptrn.speculativeRelate(newhours, v);
									});
								}

								//if it's the first in the list, make it a leader
								if(vm.edit()("person", function(e){return e;}).length === 1){
									ptrn.speculativeRelate(vm.edit(), v("role:leader"));
								}
							}
							stateTeam = false;
						},
						ondelete: function(v){
							ptrn.speculativeUnrelate(vm.edit(), v);
						},

						planhours: true,
					}),
				]),

				//Acceptance Process
				m(".editor-section.editor-section-end",[
					m(".status-content",[
						m(Toggle, {
							value: vm.edit()("mode").value(),
							label_sketch: "Concept",
							label_submitted: "Voorleggen",
							label_definitive: "Goedgekeurd",
							onchange: function(v){
								vm.edit()("mode").update(v);
							}
						}),
					]),
				]),


			]);
		}
	};
};
