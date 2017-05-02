var Program = function(){

	var content = [];
	var onclick;

	function getContent(){
		model.get("domain", {}, function(data){
			content = data;
		});
	}

	function newItem(name){
		model.post("program", {
			name: name
		}, function(data){
			getContent();
			onclick(data.id);
		});
	}



	getContent();

	return {
		oninit: function(vnode){
			onclick = function(id){
				vnode.attrs.onselect(id);
				shiftViewer(0);
			};
		},
		view: function(vnode){
			return m(List, {
				title:"Programma's",
				selected: vnode.attrs.selected,
				content: content,
				onclick: onclick,
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
