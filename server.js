var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	mongoose = require('mongoose'),
	mdb = require('./dbfunctions'),
	iofunctions = require('./iofunctions');

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/studentScanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', mdb.setUp);

iofunctions.connect(http);

app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname + '/public'});
});

app.get('/sign-in', function(req, res) {
	res.sendFile('sign-in.html', {root: __dirname + '/public'});
});

app.get('/admin', function(req, res) {
	res.sendFile('admin.html', {root: __dirname + '/public'});
});

app.get('/student-list-manager', function(req, res) {
	res.sendFile('student-list-manager.html', {root: __dirname + '/public'});
});

http.listen(8082, function() {
	console.log('listening on *:8082');
});