'use strict';
const
async = require('async'),
	file = require('file'),
	request = require('request'),
	rdfParser = require('./lib/rdf-parser.js'),
	work = async.queue(function(path, done) {
		console.warn('Parsing file ', path);
		rdfParser(path, function(err, doc) {
			console.warn('File parsed!', doc);
			done();
		});
	}, 1000);

console.log('beginning directory walk');

file.walk(__dirname + '/cache', function(err, dirPath, dirs, files) {
	console.log('Found ' + files.length + ' files')
	files.forEach(function(path) {
		console.log('Adding file ' + path + ' to the worker queue...')
		work.push(path);
		console.log('work.tasks.length: ', work.tasks.length);
		console.log('File ' + path + ' added to the worker queue')
	});
});