var PersonalEfforts = function(){

	function selection(callback){
		if(vm.focus().type()==="person"){
			return vm.focus()("effort", function(effort){
				return {
					effort: effort,
					hours: effort("hours", function(h){return h;}).filter(function(h){
						return (h("#"+vm.focus().id()).id()>-1);
					})
				};
			}).reduce(function(reduced, hour){
				var found = reduced.find(function(other){
					return ptrn.compare(other.effort, hour.effort);
				});

				if(found){
					found.hours = found.hours.concat(hour.hours);
				} else {
					reduced.push(hour);
				}
				return reduced;
			},[]).map(callback);
		} else if(vm.focus().type()==="effort"){
			return vm.focus()("person", function(effort){
				return {
					effort: effort,
					hours: effort("hours", function(h){return h;}).filter(function(h){
						return (h("#"+vm.focus().id()).id()>-1);
					})
				};
			}).reduce(function(reduced, hour){
				var found = reduced.find(function(other){
					return ptrn.compare(other.effort, hour.effort);
				});

				if(found){
					found.hours = found.hours.concat(hour.hours);
				} else {
					reduced.push(hour);
				}
				return reduced;
			},[]).map(callback);
		} else if(vm.focus().type()==="program") {
			return vm.focus()("task effort", function(effort){
				return {
					effort: effort,
					hours: effort("hours", function(hourstring){
						return hourstring;
					})
				};
			}).map(callback);
		}
	}

/*
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
*/
	return {
		view: function(vnode){
			return m(".personal-efforts",{
				onscroll: function(e){
					vnode.attrs.onscroll(e.target.scrollTop);
				}
			},[
				selection(function(element){
					return m(".personal-efforts-effort.state-selectable", {
						class: (ptrn.compare(vm.hover(), element.effort)) ? "state-selected":"",
						onmouseover: function(){
							vm.hover(element.effort);
							m.redraw();
						},
						onmouseout: vm.unhover
					}, [
						m(Numbering, {node: element.effort, whole: true, disabled: (element.effort("startdate").value()==="_/_/_")}),
						m(".personal-efforts-effort-details", [
							m(".personal-efforts-effort-name", element.effort.value()),

							(vnode.attrs.currentView === 1 && (vm.focus().type()==="person" || vm.focus().type()==="effort")) ? m(DateEditor, {element: element}) : [],
							(vnode.attrs.currentView === 2) ? m(DateVisible, {element: element}) : [],
							m(NavWidget, {node: element.effort})
						]),
					]);
				})
			]);
		}
	};
};

var DateVisible = function(){
	return {
		view: function(vnode){
		return m(".personal-efforts-effort-date", [
				m("span", "van"),
				m(DateDisplay, {
					onclick: function(date){
						vnode.attrs.setDate(date[0]);
					},
					date: vnode.attrs.element.effort("startdate").value()
				}),
				m("span", "t/m"),
				m(DateDisplay, {
					onclick: function(date){
						var d = date[0];
						if(date[1]){ d = date[1]; }
						vnode.attrs.setDate(d);
					},
					date: vnode.attrs.element.effort("enddate").value()
				}),
			]);
		}
	};
};

var DateEditor = function(){
	return {
		view: function(vnode){
			console.log(vnode.attrs);
			return [

				vnode.attrs.element.hours.map(function(hours){
					var parsedhours = HoursSpent.Parse(hours.value());
					return m(".personal-efforts-effort-date", parseInt(parsedhours.hours));
				}),

				m(".personal-efforts-effort-date-add", {
					onclick: function(){
						ptrn.create("hours", vnode.attrs.element.effort("startdate").value()+"-"+vnode.attrs.element.effort("enddate").value()+"-0-0-w-0-w", function(newhours){
							ptrn.relate(newhours, vnode.attrs.element.effort);
							ptrn.relate(newhours, vm.focus());
						});
					}
				},"uren toevoegen")
			];
		}
	};
};

//var DateEditor = function(){
//	return {
//		view: function(vnode){
//			console.log(vnode.attrs);
//			return [
//
//				vnode.attrs.element.hours.map(function(hours){
//					var parsedhours = HoursSpent.Parse(hours.value());
//					return m(".personal-efforts-effort-date", [
//						m(NumberRoller, {
//							value: parseInt(parsedhours.hours),
//							oninput: function(value){
//								parsedhours.hours = ""+value;
//								hours.update(HoursSpent.toString(parsedhours));
//								m.redraw();
//							}
//						}),
//						m("span", " uur, van"),
//						m(DateWeekSelector, {
//							oninput: function(date){
//								parsedhours.start = date;
//								hours.update(HoursSpent.toString(parsedhours));
//								m.redraw();
//							},
//							date: parsedhours.start
//						}),
//						m("span", "t/m"),
//						m(DateWeekSelector, {
//							oninput: function(date){
//								parsedhours.end = date;
//								hours.update(HoursSpent.toString(parsedhours));
//								m.redraw();
//							},
//							date: parsedhours.end
//						}),
//						m("span", {
//							onclick: function(){
//								ptrn.speculativeUnrelate(hours, vnode.attrs.element.effort);
//								ptrn.speculativeUnrelate(hours, vm.focus());
//							}
//						},"x")
//					]);
//				}),
//
//				m(".personal-efforts-effort-date-add", {
//					onclick: function(){
//						ptrn.create("hours", vnode.attrs.element.effort("startdate").value()+"-"+vnode.attrs.element.effort("enddate").value()+"-0-0-w-0-w", function(newhours){
//							ptrn.relate(newhours, vnode.attrs.element.effort);
//							ptrn.relate(newhours, vm.focus());
//						});
//					}
//				},"uren toevoegen")
//			];
//		}
//	};
//};
//
