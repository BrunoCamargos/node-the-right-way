'use strict';
const
async = require('async'),
	file = require('file'),
	request = require('request'),
	rdfParser = require('./lib/rdf-parser.js'),
	work = async.queue(function(path, done) {
		console.warn('Parsing file ', path);
		rdfParser(path, function(err, doc) {
			console.log('Inserting doc into database');
			request({
				method: 'PUT',
				url: 'http://localhost:5984/books/' + doc._id,
				json: doc
			}, function(err, res, body) {
				if (err) {
					throw Error(err);
				}
				console.log(res.statusCode, body);
				done();
			});
		});
	}, 10);

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