const mongoose = require('mongoose');

const MarksSchema = new mongoose.Schema({
  student: String,
  regno: String,
  semester: String,
  subjectCode: String,
  subjectName: String,
  marks: Number,
  colid: Number
});

module.exports = mongoose.model('cMarks', MarksSchema);