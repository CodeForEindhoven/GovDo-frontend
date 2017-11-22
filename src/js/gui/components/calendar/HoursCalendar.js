var HoursCalendar = function(){
	//var opentime, closetime;
	var p = {
		w:100, h:100,
		scale: 1,
		margin: 2,
		opentime: 0,
		closetime: 0
	};

	function setCurrentDate(date, scale){
		p.opentime =  FuzzyDate.getMonday(date);
		p.scale = scale;
		if(scale===1){
			p.closetime =  FuzzyDate.nextKwarter(p.opentime);
		} else {
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
					m(CalendarGrid, {p: p}),
					m(CalendarHours, {p: p}),
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

var CalendarHours = function(){
	return {
		view: function(vnode){

			//starting date
			var monday =  vnode.attrs.p.opentime;

			//map hours to objects
			var hours = vm.focus()("effort hours", function(hourstring){
				return HoursSpent.Parse(hourstring.value());
			});

			//margin and width
			var mrg = vnode.attrs.p.margin;
			var w = (vnode.attrs.p.w-mrg*2)/12;

			return ArrayFromRange(0, 11).map(function(week){
				var startWeek = monday;
				var offset = 0;
				var totalhours = 0;
				var count = -1;

				var blocks = hours.map(function(hour){
					count++;
					if(FuzzyDate.inRange(hour.start, hour.end, startWeek)){
						hour.hours = parseInt(hour.hours);
						totalhours += hour.hours;

						var h = hour.hours*(vnode.attrs.p.h/40);
						offset+=h;

						return m("rect.calendar-block", {class: "color-"+(count%4), x: week*w+mrg+0.5, y:vnode.attrs.p.h-offset, width: w+0.5, height: h});
					} else {
						return [];
					}
				});

				if(totalhours > 40) {
					blocks.push(m("rect.calendar-block-overshoot", {x: week*w+mrg+0.5, y:0, width: w+0.5, height: vnode.attrs.p.h/80}));
				}

				//update to next week
				if(vnode.attrs.p.scale===1){
					monday = FuzzyDate.nextWeek(monday);
				} else {
					monday = FuzzyDate.nextMonth(monday);
				}

				return blocks;
			});
		}
	};
};

var CalendarGrid = function(){
	return {
		view: function(vnode){
			var grid = [];
			var mrg = vnode.attrs.p.margin;
			var w = (vnode.attrs.p.w-mrg*2)/12;
			var h = vnode.attrs.p.h/40;
			for(var i=0; i<12; i++){
				for(var j=0; j<40; j++){
					grid.push(m("rect.calendar-grid", {x:i*w+1+mrg, y:j*h+1, width:w-1, height: h-1}));
				}
			}

			return grid;
		}
	};
};
