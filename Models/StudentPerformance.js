// models/StudentPerformance.js
const mongoose = require('mongoose');

const StudentPerformanceSchema = new mongoose.Schema({
  student: String,
  regno: String,
  colid: Number,
  score: Number // previous exam performance
});

module.exports = mongoose.model('StudentPerformance', StudentPerformanceSchema);