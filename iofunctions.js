var io;
var fs = require('fs');
var exported = {};
var mdb = require('./dbfunctions');

var eventName,
	eventDate,
	eventLateTime;

exported.connect = function(http) {
	io = require('socket.io')(http);

	io.on('connection', function(socket) {
		console.log(socket.handshake.headers.referer);
		
		socket.on('add student', function(newStudent) {
			console.log(mdb.addStudent(newStudent));
			io.emit('student added', newStudent);
		});

		socket.on('update student table', function() {
			var promise = mdb.displayStudents();
			promise.addBack(function(err, students) {
				socket.emit('update student table', students);
			});
		});

		socket.on('delete student', function(_id) {
			mdb.deleteStudent(_id);
		});

		socket.on('update student fields', function(updatedStudent) {
			mdb.modifyStudent(updatedStudent);
		});

		socket.on('create event', function(eventObject) {
			eventName = eventObject.eventName;
			eventDate = eventObject.eventDate;
			eventLateTime = eventObject.eventLateTime;
			socket.emit('event created', eventObject);
			console.log(eventObject);
		});

	});
};

module.exports = exported;