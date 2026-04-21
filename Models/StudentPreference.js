const mongoose = require('mongoose');

const StudentPreferenceSchema = new mongoose.Schema({
  student: String,
  regno: String,
  colid: Number,
  preferences: [String] // ordered list of course codes
});

module.exports = mongoose.model('StudentPreference', StudentPreferenceSchema);