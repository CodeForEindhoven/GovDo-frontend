var LinearCalendar = function(){
	var opentime =  FuzzyDate.getMonday(new Date());
	var closetime =  FuzzyDate.nextKwarter(opentime);

	var p = {
		w:100, h:100,
		margin: 2,
		opentime: opentime,
		closetime: closetime
	};

	function resize(dom){
		var rect = dom.getBoundingClientRect();
		p.w = rect.width;
		p.h = rect.height;
		p.margin = rect.width*0.02;
		console.log(p);
	}

	function shiftdate(pm){
		if(pm>0){
			p.opentime = FuzzyDate.getMonday(FuzzyDate.nextWeek(p.opentime));
		} else {
			p.opentime = FuzzyDate.getMonday(FuzzyDate.prevWeek(p.opentime));
		}
		p.closetime =  FuzzyDate.nextKwarter(p.opentime);

	}

	return {
		view: function(vnode){
			var hcount = -1;
			return m(".calendar",[
				m(".next-week", {
					onclick: shiftdate
				}, "next week"),
				m("svg",{
					oncreate: function(vnode) {
						resize(vnode.dom);
						window.addEventListener("resize", function(){
							resize(vnode.dom);
							m.redraw();
						});
					},
					onmousewheel: function(e){
						if(e.wheelDelta >= 0){
							shiftdate(1);
						} else {
							shiftdate(-1);
						}
					}
				},[
					m(CalendarLines, {p: p}),
					vm.person()("effort", function(effort){
						hcount++;
						return m(CalendarTimeLine, {p: p, offsetTop: vnode.attrs.scrollTop, top: hcount, effort: effort});
					})
				]),
				m(CalendarLabels, {p: p})
			]);
		}
	};
};

var CalendarLabels = function(){

	function labels(vnode){
		var monday =  vnode.attrs.p.opentime;

		return ArrayFromRange(0,11).map(function(offset){
			var currentWeek = FuzzyDate.currentWeek(monday);
			var labels = {week: currentWeek, date: monday.getDate()+"-"+(monday.getMonth()+1)};
			monday = FuzzyDate.nextWeek(monday);
			return labels;
		});
	}

	return {
		view: function(vnode){
			return m(".calendar-labels", labels(vnode).map(function(label){
				return m(".calendar-label", [
					m(".calendar-label-week", "week "+ label.week),
					m(".calendar-label-date", label.date),
				]);
			}));
		}
	};
};

var CalendarTimeLine = function(){
	//should be defined at top

	return {
		view: function(vnode){
			var opentime =  vnode.attrs.p.opentime.getTime();
			var closetime =  vnode.attrs.p.closetime.getTime();
			var openlength = closetime - opentime;

			//correct for margins
			opentime -= openlength/48;
			closetime += openlength/48;
			openlength = closetime - opentime;

			var starttime = FuzzyDate.toRange(vnode.attrs.effort("startdate").value())[0];
			var endtime = FuzzyDate.toRange(vnode.attrs.effort("enddate").value())[0];
			//calculate positions
			var width = vnode.attrs.p.w;
			var top = vnode.attrs.top*100+20;
			var ratio = width / openlength;
			var xstart = 0;
			var xend = width;

			if(starttime){
				starttime = starttime.getTime();
				if(starttime > opentime) {
					xstart = (starttime - opentime) * ratio + 0;
				}
			}

			if(endtime){
				endtime = endtime.getTime();
				if(endtime < closetime) {
					xend = (endtime - opentime) * ratio + 0;
				}
			}
			console.log(starttime, opentime);
			return [
				m("line.calendar-timeline", {
					x1:xstart, 				y1: top-vnode.attrs.offsetTop,
					x2:xend, 				y2: top-vnode.attrs.offsetTop
				}),
				(starttime >= opentime) ? m("circle.calendar-timeline", {cx: xstart, cy: top-vnode.attrs.offsetTop, r: 5}) : [],
				(endtime <= closetime) ? m("circle.calendar-timeline", {cx: xend, cy: top-vnode.attrs.offsetTop, r: 5}) : [],
			];

		}
	};
};

var CalendarTodayLine = function(){
	return {
		view: function(vnode){
			var grid = [];
			var w = vnode.attrs.p.w/12;
			var h = vnode.attrs.p.h;
			return m("line.calendar-todayline", {
				x1:i*w, y1:0,
				x2:i*w, y2: h
			});

		}
	};
};


var CalendarLines = function(){
	return {
		view: function(vnode){
			var grid = [];
			var mrg = vnode.attrs.p.margin;
			var w = (vnode.attrs.p.w-mrg*2)/12;
			var h = vnode.attrs.p.h;
			for(var i=0; i<13; i++){
				grid.push(m("line.calendar-lines", {
					x1:i*w+mrg, y1:0,
					x2:i*w+mrg, y2: h
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
					grid.push(m("rect.calendar-grid", {x:i*w+2, y:j*h+2, width:w-2, height: h-2}));
				}
			}

			return grid;
		}
	};
};
