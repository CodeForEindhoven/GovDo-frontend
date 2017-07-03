var compressor = require('node-minify');
console.log("building...");
compressor.minify({
	compressor: 'uglifyjs',
	input: [
		'./src/js/config.js',

		"./src/js/models/Models.js",
		"./src/js/models/Program.js",
		"./src/js/models/Task.js",
		"./src/js/models/Effort.js",
		"./src/js/models/Person.js",
		"./src/js/models/Changes.js",
		"./src/js/models/Search.js",

		"./src/js/viewmodels/viewModels.js",
		"./src/js/viewmodels/Hierarchy.js",

		"./src/js/components/*.js",

		'./src/js/main.js'
	],
	output: './src/js/main.min.js',
	callback: function (err, min) {
		if(err) console.log(err);
		console.log("export main.min.js");
	}
});
