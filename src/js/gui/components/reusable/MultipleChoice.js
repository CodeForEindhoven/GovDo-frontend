var MultipleChoice = function(){
	return {
		view: function(vnode){
			return m(".mulitiplechoice",[
				m(".mulitiplechoice-choice", {
					onclick: function(){
						vnode.attrs.onchange(0);
					}
				},m(Icon, {
					name: "feedback-top",
					selected: (vnode.attrs.value===0)
				})),
				m(".mulitiplechoice-choice", {
					onclick: function(){
						vnode.attrs.onchange(1);
					}
				},m(Icon, {
					name: "feedback-middle",
					selected: (vnode.attrs.value===1)
				})),
				m(".mulitiplechoice-choice", {
					onclick: function(){
						vnode.attrs.onchange(2);
					}
				},m(Icon, {
					name: "feedback-low",
					selected: (vnode.attrs.value===2)
				})),
			]);
		}
	};
};
