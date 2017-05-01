var Program = function(){

	var content = [];

	function getContent(){
		model.get("domain", {}, function(data){
			content = data;
		});
	}

	function newItem(name){
		model.post("program", {
			name: name
		}, function(){
			getContent();
		});
	}

	getContent();

	return {
		view: function(vnode){
			return m(List, {
				title:"Programma's",
				selected: vnode.attrs.selected,
				content: content,
				onclick: function(id){
					console.log("click");
					vnode.attrs.onselect(id);
					shiftViewer(0);
				},
				onadd: newItem
			});
		}
	};
};

/*
[
	"Sociale Basis",
	"Versterken 1ste lijn",
	"Innoveren van 2e lijn en top",
	"Jeugd",
	"WMO",
	"Participatie ",
	"Schulden en armoede",
	"Onderwijs",
	"Migratie",
	"Inkoop, subsidies, contractering",
	"Basis op orde. monitoring, P&C",
	"Planlab en inkomen",
]
*/
