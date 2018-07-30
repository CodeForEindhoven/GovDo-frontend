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
			var seriesTop = vnode.attrs.series.map(function(a){return a.value;}).reduce(function(a, b) {
				return Math.max(a, b);
			});
			return [
				m(".dashboard-histogram", [
					vnode.attrs.series.map(function(set){
						return m(".histogram-set",{
							onclick: set.link
						},[
							m(".histogram-set-value",
							(set.value>0) ?
								m(".histogram-set-value-bar", {
									style: "width:"+((set.value/seriesTop)*100)+"%;"
								}, set.value )
							:
								m(".histogram-set-value-bar-null", 0 )
							),
							m(".histogram-set-label", set.label),
						]);
					})
				]),
			];
		}
	};
};
