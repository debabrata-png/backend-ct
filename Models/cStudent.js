const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  student: String,
  regno: String,
  semester: String,
  program: String,
  year: String,
  colid: Number
});

module.exports = mongoose.model('cStudent', StudentSchema);