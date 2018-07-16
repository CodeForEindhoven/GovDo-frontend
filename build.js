var compressor = require('node-minify');
var less = require('less');
var fs = require('fs');

console.log("building js...");
compressor.minify({
	compressor: 'uglifyjs',
	input: [
		'./src/js/config.js',

		"./src/js/polyfills/*.js",

		"./src/js/models/Models.js",
		"./src/js/models/keywords.js",
		"./src/js/models/Ptrn.js",
		"./src/js/models/Ptrn2.js",

		"./src/js/viewmodels/viewModels.js",
		"./src/js/viewmodels/typeName.js",

		"./src/js/gui/**/*.js",

		"./src/js/main.js"
	],
	output: './src/js/main_02.min.js',
	callback: function (err, min) {
		if(err) console.log(err);
		console.log("export main.min.js");
	}
});

fs.readFile('./src/style/main.less',function(error,data){
	console.log("building css...");
	data = data.toString();
		less.render(data, {
			paths: ['./src/style/'],  // Specify search paths for @import directives
			filename: 'main.less',
			strictMath: true
		}, function (e, css) {
			if(e) console.log(e);
			fs.writeFile('./src/style/main.css', css.css, function(err){
				if(err) console.log(err);
				console.log('export main.css');
			});
	});
});
