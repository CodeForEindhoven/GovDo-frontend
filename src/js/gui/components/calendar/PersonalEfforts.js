var PersonalEfforts = function(){

	function selection(callback){
		if(vm.focus().type()==="program"){
			return vm.program()("task effort", callback);

		} else if(vm.focus().type()==="task"){
			return vm.task()("effort", callback);

		} else if(vm.focus().type()==="effort"){
			return vm.effort()("person", callback);

		} else if(vm.focus().type()==="person"){
			return vm.person()("effort", callback);
		}
	}

	return {
		view: function(vnode){
			return vm.person() ? m(".personal-efforts",{
				onscroll: function(e){
					vnode.attrs.onscroll(e.target.scrollTop);
				}
			},[
				selection(function(effort){
					return (vm.focus().type()==="effort") ?
					//list of people
					m(".personal-efforts-effort.state-selectable", {
						class: (ptrn.compare(vm.hover(), effort)) ? "state-selected":"",
						onmouseover: function(){
							vm.hover(effort);
							m.redraw();
						},
						onmouseout: vm.unhover
					}, [
						m(".personal-efforts-effort-details", [
							m(".personal-efforts-effort-name", effort.value()),
							//m(".personal-efforts-effort-type", emptyState(viewModels.typeNames[effort("type").value()], m(".effortselector-type-state.state-empty", "Nog geen type"))),
							m(NavWidget, {node: effort})
						]),
					])
					:
					//list of efforts
					m(".personal-efforts-effort.state-selectable", {
						class: (ptrn.compare(vm.hover(), effort)) ? "state-selected":"",
						onmouseover: function(){
							vm.hover(effort);
							m.redraw();
						},
						onmouseout: vm.unhover
					},  [
						m(Numbering, {node: effort, whole: true, disabled: (effort("startdate").value()==="_/_/_")}),
						m(".personal-efforts-effort-details", [
							m(".personal-efforts-effort-name", effort.value()),

							//show dates
							(vnode.attrs.currentView === 1 && vm.focus().type()==="person") ? [
								//block view
								effort("hours", function(hours){
									var parsedhours = HoursSpent.Parse(hours.value());

									return m(".personal-efforts-effort-date", [
										m(NumberRoller, {
											value: parseInt(parsedhours.hours),
											oninput: function(value){
												parsedhours.hours = ""+value;
												hours.update(HoursSpent.toString(parsedhours));
												m.redraw();
											}
										}),
										m("span", " uur, van"),
										m(DateWeekSelector, {
											oninput: function(date){
												parsedhours.start = date;
												hours.update(HoursSpent.toString(parsedhours));
												m.redraw();
											},
											date: parsedhours.start
										}),
										m("span", "t/m"),
										m(DateWeekSelector, {
											oninput: function(date){
												parsedhours.end = date;
												hours.update(HoursSpent.toString(parsedhours));
												m.redraw();
											},
											date: parsedhours.end
										}),
										m("span", {
											onclick: function(){
												ptrn.speculativeUnrelate(hours, effort);
												ptrn.speculativeUnrelate(hours, vm.person());
											}
										},"x")
									]);
								}),

								m(".personal-efforts-effort-date-add", {
									onclick: function(){
										ptrn.create("hours", effort("startdate").value()+"-"+effort("enddate").value()+"-0-0-w-0-w", function(newhours){
											ptrn.relate(newhours, effort);
											ptrn.relate(newhours, vm.person());
										});
									}
								},"uren toevoegen")

							] : [
								//linear view
								m(".personal-efforts-effort-date", [
									m("span", "van"),
									m(DateDisplay, {
										onclick: function(date){
											vnode.attrs.setDate(date[0]);
										},
										date: effort("startdate").value()
									}),
									m("span", "t/m"),
									m(DateDisplay, {
										onclick: function(date){
											var d = date[0];
											if(date[1]){ d = date[1]; }
											vnode.attrs.setDate(d);
										},
										date: effort("enddate").value()
									}),
								]),
								m(".personal-efforts-effort-type", emptyState(viewModels.typeNames[effort("type").value()], m(".effortselector-type-state.state-empty", "Nog geen type"))),
							],

							m(NavWidget, {node: effort})
						]),
					]);
				})
			]) : [];
		}
	};
};
