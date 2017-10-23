var DashboardDistribution = function(){

	var p = {w:100, h:100, m: 40};

	function getFullSeries(list){
		var output = list;
		//for(var x=0; x<list.length; x++){
		//	output[list[x]] = x;
		//}
		for(var i=0; i<output.length;i++){
			if(!output[i]){output[i] = 0;}
		}
		return output;
	}



	function resize(dom){
		var rect = dom.getBoundingClientRect();
		p.w = rect.width;
		p.h = rect.height;
		m.redraw();
	}

	return {
		view: function(vnode){
			var series = getFullSeries(vnode.attrs.series);
			var seriesTop = series.reduce(function(a, b) {
				return Math.max(a, b);
			});
			var orderofmag = Math.max(0, seriesTop.toString().length-2);
			var ysteps = Math.floor(seriesTop/Math.pow(10,orderofmag));
			return [
				m(".dashboard-distribution", [
					m(".distribution-name", vnode.attrs.label),
					m("svg",{
						oncreate: function(vnode) {
							resize(vnode.dom);
							window.addEventListener("resize", function(){
								resize(vnode.dom);
							});
						}
					}, [
						m("rect.distribution-back",{x:p.m, y:0, width: p.w-p.m, height: p.h-p.m}),
						ArrayFromRange(0, ysteps).map(function(y){
							var step = seriesTop/ysteps;
							y = y*step;

							//var h = (p.h-20) / Math.floor((p.h-p.m)/20);
							var h = p.h-p.m;
							var py = (y/seriesTop)*(h);

							return m("text.distribution-label-y", {x:p.m-5, y:h-py}, y);
						}),
						series.map(function(y, x){
							var w = (p.w-p.m) / series.length;
							var h = p.h-p.m;
							y = (y/seriesTop)*h;

							return [
								m("rect.distribution-rect", {
									x:x*w+p.m, y:h-y, width:w, height:y,
									class: (x===0) ? "dragon":""
								}),
								m("text.distribution-label-x", {x:x*w+(w/2)+p.m, y:h+15}, x)
							];
						}),
						m("text.distribution-name-x", {x:p.w/2, y:p.h-5}, vnode.attrs.labelx),
						m("text.distribution-name-y", {x:15, y:p.h/2, transform: "rotate(270 15,"+(p.h/2)+")"}, vnode.attrs.labely)
					]),
				]),
			];
		}
	};
};
