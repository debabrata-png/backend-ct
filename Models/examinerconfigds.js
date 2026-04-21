const mongoose = require('mongoose');

const examinerconfigdsschema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  colid: { type: Number, required: true },
  program: { type: String },
  examcode: { type: String },
  month: { type: String },
  year: { type: String },
  regulation: { type: String },
  semester: { type: String },
  branch: { type: String },
  papercode: { type: String },
  papername: { type: String },
  examiner1: { type: String }, // email or user id
  examiner2: { type: String },
  examiner3: { type: String },
});

const examinerconfigds = mongoose.model('examinerconfigds', examinerconfigdsschema);
module.exports = examinerconfigds;
