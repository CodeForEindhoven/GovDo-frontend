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
	function selection(callback){
		if(vm.focus().type()==="program"){
			return vm.program()("task effort", callback);

		} else if(vm.focus().type()==="task"){
			return vm.task()("effort", callback);

		} else if(vm.focus().type()==="effort"){
			return callback(vm.effort());

		} else if(vm.focus().type()==="person"){
			return vm.person()("effort", callback);
		}
	}

	//var opentime, closetime;
	var p = {
		w:100, h:100,
		scale: 1,
		margin: 2,
		opentime: 0,
		closetime: 0
	};

	function setCurrentDate(date, scale){

		p.scale = scale;
		if(scale===1){
			p.opentime =  FuzzyDate.getMonday(date);
			p.closetime =  FuzzyDate.nextKwarter(p.opentime);
		} else {
			p.opentime = FuzzyDate.getFirstDayOfMonth(date);
			p.closetime =  FuzzyDate.nextYear(p.opentime);
		}

	}

	function resize(dom){
		var rect = dom.getBoundingClientRect();
		p.w = rect.width;
		p.h = rect.height;
		p.margin = rect.width*0.02;
		console.log(p);
		m.redraw();
	}

	function setDate(vnode, updown){
		if(p.scale===1){
			if(updown){
				vnode.attrs.setDate(FuzzyDate.nextWeek(p.opentime));
			} else {
				vnode.attrs.setDate(FuzzyDate.prevWeek(p.opentime));
			}
		} else {
			if(updown){
				vnode.attrs.setDate(FuzzyDate.nextMonth(p.opentime));
			} else {
				vnode.attrs.setDate(FuzzyDate.prevMonth(p.opentime));
			}
		}

	}

	return {
		view: function(vnode){
			var hcount = -1;
			setCurrentDate(vnode.attrs.currentDate, vnode.attrs.currentScale);

			return m(".calendar",[
				m("svg",{
					oncreate: function(vnode) {
						resize(vnode.dom);
						window.addEventListener("resize", function(){
							resize(vnode.dom);
						});
					},
					onmousewheel: function(e){
						setDate(vnode, e.wheelDelta >= 0);
					},
					onDOMMouseScroll: function(e){
						setDate(vnode, e.detail >= 0);
					}
				},[
					m(CalendarLines, {p: p}),
					m(CalendarTodayLine, {p: p}),
					selection(function(effort){
						hcount++;
						return m(CalendarTimeLine, {p: p, offsetTop: vnode.attrs.scrollTop, top: hcount, effort: effort});
					})
				]),
				m(CalendarLabels, {
					p: p,
					ondrag: function(dx){
						setDate(vnode, dx>0);
					}
				})
			]);
		}
	};
};

var CalendarLabels = function(){
	var months = ["januari","februari","maart","april","mei","juni", "juli", "augustus", "september", "oktober", "november", "december"];

	function labels(vnode){
		var monday =  vnode.attrs.p.opentime;
		var phase = 0;


		if(vnode.attrs.p.scale===1){
			var month = -1;

			return ArrayFromRange(0,11).map(function(offset){
				var currentWeek = FuzzyDate.currentWeek(monday);
				var showmonth = "";

				//get labels and colors
				if(month !== monday.getMonth()){
					month = monday.getMonth();
					showmonth = months[monday.getMonth()];
					phase = month % 2;
				}

				var labels = {
					week: "week "+ currentWeek,
					date: monday.getDate(),
					month: showmonth,
					phase: phase
				};
				monday = FuzzyDate.nextWeek(monday);
				return labels;
			});
		} else {
			var year = -1;

			return ArrayFromRange(0,11).map(function(offset){
				var showyear = "";

				if(year !== monday.getFullYear()){
					year = monday.getFullYear();
					showyear = year;
					phase = year % 2;
				}

				var labels = {
					week: months[monday.getMonth()],
					date: "",
					month: showyear,
					phase: phase
				};
				monday = FuzzyDate.nextMonth(monday);
				return labels;
			});
		}

	}

	var clicked = false;
	var downX = 0;
	document.addEventListener("mouseup", function(){
		clicked = false;
	}, false);

	return {
		view: function(vnode){
			return m(".calendar-labels", {
				onmousedown: function(e){
					clicked = true;
					downX = e.clientX;
				},
				onmousemove: function(e){
					if(clicked){
						var dx = downX - e.clientX;
						if(dx > 50){
							vnode.attrs.ondrag(1);
							downX = e.clientX;
						}
						if(dx < -50){
							vnode.attrs.ondrag(-1);
							downX = e.clientX;
						}
					}
				}
			}, [
				m(".calendar-navbutton", {
					onclick: function(){vnode.attrs.ondrag(-1);}
				}, m("i.material-icons", "keyboard_arrow_left")),
				labels(vnode).map(function(label){
					return m(".calendar-label", [
						m(".calendar-label-week", label.week),
						m(".calendar-label-month", {
							class: (label.phase===1) ? "calendar-label-phase-a": "calendar-label-phase-b"
						}, label.month),
						m(".calendar-label-date", label.date),
					]);
				}),
				m(".calendar-navbutton", {
					onclick: function(){vnode.attrs.ondrag(1);}
				}, m("i.material-icons", "keyboard_arrow_right")),
			]
		);
		}
	};
};

var CalendarTimeLine = function(){
	//should be defined at top

	return {
		view: function(vnode){

			//calculate positions
			var width = vnode.attrs.p.w;
			var top = vnode.attrs.top*150+20 - vnode.attrs.offsetTop;

			var startdate = FuzzyDate.toRange(vnode.attrs.effort("startdate").value());
			var enddate  = FuzzyDate.toRange(vnode.attrs.effort("enddate").value());

			if(startdate[0] && startdate[0].getTime() === -8640000000000000) {
				startdate[1] = undefined;
			}
			if(enddate[0] && enddate[0].getTime() === -8640000000000000) {
				enddate[0] = new Date(enddate[1]);
				enddate[1] = undefined;
			}

			var range = [undefined, undefined, undefined, undefined];


			if(startdate[1]){
				range[0] = mapDatePosition(vnode.attrs.p, startdate[0]);
				range[1] = mapDatePosition(vnode.attrs.p, startdate[1]);
			} else if(startdate[0]) {
				range[1] = mapDatePosition(vnode.attrs.p, startdate[0]);
			}

			if(enddate[1]){
				range[2] = mapDatePosition(vnode.attrs.p, enddate[0]);
				range[3] = mapDatePosition(vnode.attrs.p, enddate[1]);
			} else if(enddate[0]) {
				range[2] = mapDatePosition(vnode.attrs.p, enddate[0]);
			}

			return [
				(range[0] !== undefined) ? m("line.calendar-timeline-dashed", {
					x1:range[0], 				y1: top,
					x2:range[1], 				y2: top
				}) : [],
				(range[1] !== undefined && range[2] !== undefined) ? m("line.calendar-timeline", {
					x1:range[1], 				y1: top,
					x2:range[2], 				y2: top
				}) : [],
				(range[3] !== undefined) ? m("line.calendar-timeline-dashed", {
					x1:range[2], 				y1: top,
					x2:range[3], 				y2: top
				}) : [],
				(range[1] > 0) ? m("circle.calendar-timeline", {cx: range[1], cy: top, r: 5}) : [], // to change the shape in the beginning and end of the project time line
				(range[2] < width) ? m("circle.calendar-timeline", {cx: range[2], cy: top, r: 5}) : [],
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
