// Models/sublimitconfds.js
const mongoose = require('mongoose');

const sublimitconfschema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  colid: { type: Number, required: true },
  year: { type: String, required: true },
  programcode: { type: String, required: true },
  semester: { type: String, required: true },
  minSubjects: { type: Number, required: true, default: 6 },
  maxSubjects: { type: Number, required: true, default: 6 },
  minLanguage: { type: Number, required: true, default: 2 },
  maxLanguage: { type: Number, required: true, default: 2 },
  minCompulsory: { type: Number, required: true, default: 1 },
  minAdditional: { type: Number, required: true, default: 1 },
  minSkillDevelopment: { type: Number, required: true, default: 0 },
  maxSkillDevelopment: { type: Number, required: true, default: 2 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Unique constraint for configuration
sublimitconfschema.index({ colid: 1, year: 1, programcode: 1, semester: 1 }, { unique: true });

const sublimitconfds = mongoose.model('sublimitconfds', sublimitconfschema);
module.exports = sublimitconfds;
