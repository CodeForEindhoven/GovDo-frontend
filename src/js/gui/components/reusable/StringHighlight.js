function StringHighlight(string, value){
	var splitpoint = string.toLowerCase().indexOf(value.toLowerCase());

	return [
		m("span", string.slice(0, splitpoint)),
		m("span.search-result-highlight", string.slice(splitpoint, splitpoint+value.length)),
		m("span", string.slice(splitpoint+value.length, string.length)),
	];
}
