function mapDatePosition(p, date){
	var opentime =  p.opentime.getTime();
	var closetime =  p.closetime.getTime();
	var openlength = closetime - opentime;

	//correct for margins
	opentime -= openlength/48;
	closetime += openlength/48;
	openlength = closetime - opentime;

	var width = p.w;
	var time = date.getTime();

	//if over boundries
	if(time < opentime) {
		return 0;
	}
	if(time > closetime) {
		return width;
	}

	//calculate positions
	var ratio = width / openlength;
	return (time - opentime) * ratio + 0;
}

var LinearCalendar = function(){
	//var opentime, closetime;
	var p = {
		w:100, h:100,
		margin: 2,
		opentime: 0,
		closetime: 0
	};

	function setCurrentDate(date){
		p.opentime =  FuzzyDate.getMonday(date);
		p.closetime =  FuzzyDate.nextKwarter(p.opentime);
	}

	function resize(dom){
		var rect = dom.getBoundingClientRect();
		p.w = rect.width;
		p.h = rect.height;
		p.margin = rect.width*0.02;
		console.log(p);
	}

	return {
		view: function(vnode){
			var hcount = -1;
			setCurrentDate(vnode.attrs.currentDate);
			return m(".calendar",[
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
							vnode.attrs.setDate(FuzzyDate.nextWeek(p.opentime));
						} else {
							vnode.attrs.setDate(FuzzyDate.prevWeek(p.opentime));
						}
					},
					onDOMMouseScroll: function(e){
						if(e.detail >= 0){
							vnode.attrs.setDate(FuzzyDate.nextWeek(p.opentime));
						} else {
							vnode.attrs.setDate(FuzzyDate.prevWeek(p.opentime));
						}
					}
				},[
					m(CalendarLines, {p: p}),
					m(CalendarTodayLine, {p: p}),
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
	var months = ["jan","feb","mrt","apr","mei","jun", "jul", "aug", "sep", "okt", "nov", "dec"];
	function labels(vnode){
		var monday =  vnode.attrs.p.opentime;

		return ArrayFromRange(0,11).map(function(offset){
			var currentWeek = FuzzyDate.currentWeek(monday);
			var labels = {week: currentWeek, date: monday.getDate()+" "+months[monday.getMonth()]};
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

			//calculate positions
			var width = vnode.attrs.p.w;
			var top = vnode.attrs.top*100+20 - vnode.attrs.offsetTop;

			var startdate = FuzzyDate.toRange(vnode.attrs.effort("startdate").value())[0];
			var enddate   = FuzzyDate.toRange(vnode.attrs.effort("enddate").value())[0];
			var xstart = startdate ? mapDatePosition(vnode.attrs.p, startdate) : 0;
			var xend = enddate ? mapDatePosition(vnode.attrs.p, enddate) : width;

			return [
				m("line.calendar-timeline", {
					x1:xstart, 				y1: top,
					x2:xend, 				y2: top
				}),
				(xstart > 0) ? m("circle.calendar-timeline", {cx: xstart, cy: top, r: 5}) : [],
				(xend < width) ? m("circle.calendar-timeline", {cx: xend, cy: top, r: 5}) : [],
			];

		}
	};
};

var CalendarTodayLine = function(){
	return {
		view: function(vnode){
			var h = vnode.attrs.p.h;

			var x = mapDatePosition(vnode.attrs.p, new Date());

			return m("line.calendar-todayline", {
				x1:x, y1:0,
				x2:x, y2: h
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
