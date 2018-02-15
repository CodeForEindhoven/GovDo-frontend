var KeywordOverview = function(){

	return {
		view: function(vnode){
			return m(".keywords-wrapper", m(".keywords", GetKeywords().map(function(letter){
				return m(".keywords-block", [
					m(".keywords-letter", letter.letter),
					letter.words.map(function(word){
						return m(Keyword, word);
					})
				]);
			})));
		}
	};
};

var Keyword = function(){
	var opened = false;
	return {
		view: function(vnode){
			return m(".keywords-keyword", {
				onclick: function(){
					opened = !opened;
				}
			}, [
				m(".keywords-word", {
					class: opened ? "selected": ""
				}, vnode.attrs.word),
				opened ? m(".keyword-relations", vnode.attrs.refs.map(function(ref){

					return m(".keyword-relation",{
						onclick: function(){
							if(ref.type()==="program"){
								vm.program(ref);
								vm.focus(ref);
							}
							if(ref.type()==="task"){
								vm.program(ref("program"));
								vm.task(ref);
								vm.focus(vm.program());
							}
							if(ref.type()==="effort"){
								vm.program(ref("task program"));
								vm.task(ref("task"));
								vm.effort(ref);
								vm.focus(vm.program());
							}
							vm.page(0);
						}
					},[
						m(Numbering, {node: ref, whole: true}),
						ref.value()
					]);
				})) : []
			]);
		}
	};
};
