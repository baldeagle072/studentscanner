var mongoose = require('mongoose');
var exported = {};

exported.setUp = function() {
	console.log('MongoDB connected');
};

// Models
var studentSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	id: {type: Number, index: { unique: true } },
	grade: Number
});

var Student = mongoose.model('Student', studentSchema);

var classSchema = mongoose.Schema({
	period: {type: Number, index: {unique: true}},
	classname: String,
	members: Array
});

var Class = mongoose.model('Class', classSchema);

exported.Student = Student;

// Functions
exported.displayStudents = function() {
	var p = Student.find({}).sort('lastname').exec();
	return p;
};

exported.displayStudent = function(_id) {
	var p = Student.find({ _id:_id }).exec();
	return p;
};

exported.addStudent = function(student) {
	var newStudent = new Student(student);
	newStudent.save(function(err) {
		if (err) return err;
		console.log(student.firstname + " " + student.lastname + " has been added");
	});
};

exported.modifyStudent = function(student) {
	console.log(student);
	Student.findOneAndUpdate({ id:student.id }, { firstname:student.firstname, lastname:student.lastname, grade:student.grade }, function(err) {
		if (err) console.log(err);
	});
};

exported.deleteStudent = function(_id) {
	Student.remove({ _id:_id }, function(err) {
		if (err) return handleError(err);
	});
};

setStudents = function(docs) {
	students = docs;
};

module.exports = exported;