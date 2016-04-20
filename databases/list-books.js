'use strict';

const
	file = require('file'),
	rdfParser = require('./lib/rdf-parser.js');

console.log('beginning directory walk');

file.walk(__dirname + '/cache', function(err, dirPath, dirs, files) {
	console.log(files.length);
	files.forEach(function(path) {
		console.log('parsing');
		rdfParser(path, function(err, doc) {
			if (err) {
				throw err;
			} else {
				console.log(doc);
			}
		});
	});
});