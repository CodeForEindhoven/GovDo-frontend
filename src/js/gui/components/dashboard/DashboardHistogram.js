var DashboardHistogram = function(){

	var p = {w:100, h:100, m: 40};

	function resize(dom){
		var rect = dom.getBoundingClientRect();
		p.w = rect.width;
		p.h = rect.height;
		m.redraw();
	}

	return {
		view: function(vnode){
			var seriesTop = vnode.attrs.series.map(function(a){return a[1];}).reduce(function(a, b) {
				return Math.max(a, b);
			});
			return [
				m(".dashboard-histogram", [
					m(".histogram-name", vnode.attrs.label),
					vnode.attrs.series.map(function(set){
						return m(".histogram-set",[
							m(".histogram-set-label", set[0]),
							m(".histogram-set-value", m(".histogram-set-value-bar", {
								style: "width:"+((set[1]/seriesTop)*100)+"%;"
							}, set[1])),
						]);
					})
				]),
			];
		}
	};
};
