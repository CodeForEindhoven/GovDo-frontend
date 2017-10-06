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
			var mrg = vnode.attrs.p.margin;
			var w = (vnode.attrs.p.w-mrg*2)/12;
			var h = vnode.attrs.p.h/40;
			for(var i=0; i<12; i++){
				for(var j=0; j<40; j++){
					grid.push(m("rect.calendar-grid", {x:i*w+2+mrg, y:j*h+2, width:w-2, height: h-2}));
				}
			}

			return grid;
		}
	};
};
