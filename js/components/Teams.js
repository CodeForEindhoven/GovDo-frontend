var Teams = function(){
	return {
		view: function(vnode){
			return m(List, {
				title:"Teams",
				count: 2,
				content: [
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
			});
		}
	};
};
