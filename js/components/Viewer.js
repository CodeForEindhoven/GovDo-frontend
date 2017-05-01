var Viewer = function(){
	return {
		view: function(vnode){
			return m(".page#page",[
				m(".back", {
					onclick: function(){
						document.getElementById("page").scrollBy({ top: 0, left: -(window.innerWidth/2)+5, behavior: 'smooth' });
					}
				}),
				m(Teams),
				m(Teams),
				m(Teams),
					//m(List, {title:"Opgaven",count: 1}),
					//m(List, {title:"Inspanningen",count: 2}),
					//m(List, {title:"Details",count: 3}),
			]);
		}
	};
};

function shiftViewer(to){
	document.getElementById("page").scroll({ top: 0, left: to*(window.innerWidth/2)-5, behavior: 'smooth' });
}
