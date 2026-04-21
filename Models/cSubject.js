const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subjectCode: String,
  subjectName: String,
  semester: String,
  maxMarks: Number,
    colid: Number
});

module.exports = mongoose.model('cSubject', SubjectSchema);