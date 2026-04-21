const mongoose = require('mongoose');

const studentmarks9dsschema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  colid: { type: Number, required: true },

  // Student identification
  regno: { type: String, required: true },
  studentname: { type: String },

  // Subject identification
  subjectcode: { type: String, required: true },
  subjectname: { type: String },

  // Academic context
  semester: { type: String, required: true },
  academicyear: { type: String, required: true },

  // Term 1 Marks Obtained
  term1periodictestobtained: { type: Number, default: 0 },
  term1notebookobtained: { type: Number, default: 0 },
  term1enrichmentobtained: { type: Number, default: 0 },
  term1midexamobtained: { type: Number, default: 0 },
  term1total: { type: Number, default: 0 },
  term1grade: { type: String, default: '' },

  // Term 2 Marks Obtained
  term2periodictestobtained: { type: Number, default: 0 },
  term2notebookobtained: { type: Number, default: 0 },
  term2enrichmentobtained: { type: Number, default: 0 },
  term2annualexamobtained: { type: Number, default: 0 },
  term2total: { type: Number, default: 0 },
  term2grade: { type: String, default: '' },

  // Manual Attendance (Terms 1 & 2)
  term1totalworkingdays: { type: Number, default: 0 },
  term1totalpresentdays: { type: Number, default: 0 },
  term2totalworkingdays: { type: Number, default: 0 },
  term2totalpresentdays: { type: Number, default: 0 },

  // Status
  status: { type: String, default: 'draft' }, // draft, finalized
  isactive: { type: Boolean, default: true },
  isadditional: { type: Boolean, default: false },

  // Compartment / Supplementary Exam Marks (does not affect original term marks)
  compartmentobtained: { type: Number, default: null },

  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now }
});

// Unique constraint
studentmarks9dsschema.index({
  colid: 1,
  regno: 1,
  subjectcode: 1,
  semester: 1,
  academicyear: 1
}, { unique: true });

const studentmarks9ds = mongoose.model('studentmarks9ds', studentmarks9dsschema);

module.exports = studentmarks9ds;
