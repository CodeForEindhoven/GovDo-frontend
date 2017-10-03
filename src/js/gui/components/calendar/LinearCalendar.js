var LinearCalendar = function(){
	var p = {w:100, h:100, time: 0};

	function resize(dom){
		var rect = dom.getBoundingClientRect();
		p.w = rect.width;
		p.h = rect.height;
		console.log(p);
	}
	return {
		view: function(vnode){
			var hcount = -1;
			return m(".calendar",[
				m("svg",{
					oncreate: function(vnode) {
						resize(vnode.dom);
						window.addEventListener("resize", function(){
							resize(vnode.dom);
							m.redraw();
						});
					}
				},[
					m(CalendarLines, {p: p}),
					vm.person()("effort", function(effort){
						hcount++;
						return m(CalendarTimeLine, {p: p, top: hcount, effort: effort});
					})
				]),
				m(CalendarLabels)
			]);
		}
	};
};

var CalendarLabels = function(){

	function labels(){
		var monday = FuzzyDate.getMonday(new Date());
		var currentWeek = FuzzyDate.currentWeek(monday);
		return ArrayFromRange(0,11).map(function(offset){
			var labels = {week: currentWeek+offset, date: monday.getDate()+"-"+monday.getMonth()};
			monday = FuzzyDate.nextWeek(monday);
			return labels;
		});
	}

	return {
		view: function(vnode){
			return m(".calendar-labels", labels().map(function(label){
				return m(".calendar-label", [
					m(".calendar-label-week", "week "+ label.week),
					m(".calendar-label-date", label.date),
				]);
			}));
		}
	};
};

var CalendarTimeLine = function(){
	return {
		view: function(vnode){
			return m("line.calendarTimeLine", {
				x1:0, 				y1:vnode.attrs.top*100+20,
				x2:vnode.attrs.p.w, y2: vnode.attrs.top*100+20
			});
		}
	};
};

var CalendarLines = function(){
	return {
		view: function(vnode){
			var grid = [];
			var w = vnode.attrs.p.w/12;
			var h = vnode.attrs.p.h;
			for(var i=0; i<12; i++){
				grid.push(m("line.calendarLines", {
					x1:i*w, y1:0,
					x2:i*w, y2: h
				}));
			}

			return grid;
		}
	};
};

var CalendarGrid = function(){
	return {
		view: function(vnode){
			var grid = [];
			var w = vnode.attrs.p.w/12;
			var h = vnode.attrs.p.h/40;
			for(var i=0; i<12; i++){
				for(var j=0; j<40; j++){
					grid.push(m("rect.calendarGrid", {x:i*w+2, y:j*h+2, width:w-2, height: h-2}));
				}
			}

			return grid;
		}
	};
};
