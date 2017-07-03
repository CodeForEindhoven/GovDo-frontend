var compressor = require('node-minify');
var less = require('less');
var fs = require('fs');

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

		"./src/js/gui/*.js",
		"./src/js/gui/**/*.js",

		'./src/js/main.js'
	],
	output: './src/js/main.min.js',
	callback: function (err, min) {
		if(err) console.log(err);
		console.log("export main.min.js");
	}
});

fs.readFile('./src/style/main.less',function(error,data){
	data = data.toString();
		less.render(data, {
			paths: ['./src/style/'],  // Specify search paths for @import directives
			filename: 'main.less',
		}, function (e, css) {
			fs.writeFile('./src/style/main.css', css.css, function(err){
				if(err) return console.log(err);
				console.log('export main.css');
			});
	});
});
