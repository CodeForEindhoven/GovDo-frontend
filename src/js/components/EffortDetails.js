var EffortDetails = function(){

	var currentView = -1;
	var content = {};

	function getContent(){
		model.get("details/"+currentView, {}, function(data){
			content = data[0];
		});
	}

	function setType(type){
		model.post("details/"+currentView+"/type", {
			type: type
		}, function(){
			getContent();
		});
	}


	function updateContent(program){
		if(program>0 && (program!==currentView)){
			currentView = program;
			getContent();
		}
	}

	return {
		view: function(vnode){
			updateContent(vnode.attrs.view);
			if(currentView>0){
				return m(".half",[
					m(".name", "Details"),
					m(".list",[
						m(TypeSelector, {
							effort: currentView,
							type: content.type,
							onset: setType
						})
					])
				]);
			}
		}
	};
};

var TypeSelector = function(){
	var types = [
		"Project",
		"Programma",
		"Routine"
	];

	var state = false;



	return {
		view: function(vnode){
			if(!state){
				return [
					m(".what", "Type"),
					m(".info", {onclick: function(){state=true;}}, [
						(function(t){
							if(t===-1 ){return m("span", "nog geen type");}
							return m("span",types[t]);
						}(vnode.attrs.type)),
						//m("span.edit", "edit")
					])
				];
			} else {
				return [
					m(".what", "Type"),
					m("select.select", {
						onchange: function(event){
							vnode.attrs.onset(parseInt(event.target.value-1));
							state = false;
						}
					}, [
						m("option", {disabled: true, selected: true}, "kies type..."),
						types.map(function(t, c){
							return m("option", {value: c+1}, t);
						})
					])
				];
			}

		}
	};
};
