var LinearCalendar = function(){
	var p = {w:100, h:100};
	var date = 0;

	function resize(dom){
		var rect = dom.getBoundingClientRect();
		p.w = rect.width;
		p.h = rect.height;
		console.log(p);
	}
	return {
		view: function(vnode){
			var hcount = 0;
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
						return m(CalendarTimeLine, {p: p, top: hcount});
					})
				])
			]);
		}
	};
};

var CalendarTimeLine = function(){
	return {
		view: function(vnode){
			return m("line.calendarTimeLine", {
				x1:0, 				y1:vnode.attrs.top*100,
				x2:vnode.attrs.p.w, y2: vnode.attrs.top*100
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
