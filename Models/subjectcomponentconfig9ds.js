const mongoose = require('mongoose');

const subjectcomponentconfig9dsschema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  colid: { type: Number, required: true },

  // Subject identification
  subjectcode: { type: String, required: true },
  subjectname: { type: String, required: true },

  // Academic context
  semester: { type: String, required: true }, // "9" or "10"
  academicyear: { type: String, required: true }, // "2024-25"

  // Term 1 Components - Max Marks
  term1periodictestmax: { type: Number, default: 10 },
  term1notebookmax: { type: Number, default: 5 },
  term1enrichmentmax: { type: Number, default: 5 },
  term1midexammax: { type: Number, default: 80 },

  // Term 2 Components - Max Marks
  term2periodictestmax: { type: Number, default: 10 },
  term2notebookmax: { type: Number, default: 5 },
  term2enrichmentmax: { type: Number, default: 5 },
  term2annualexammax: { type: Number, default: 80 },

  // Component Activation Flags
  term1periodictestactive: { type: Boolean, default: true },
  term1notebookactive: { type: Boolean, default: true },
  term1enrichmentactive: { type: Boolean, default: true },
  term1midexamactive: { type: Boolean, default: true },

  term2periodictestactive: { type: Boolean, default: true },
  term2notebookactive: { type: Boolean, default: true },
  term2enrichmentactive: { type: Boolean, default: true },
  term2annualexamactive: { type: Boolean, default: true },

  // Status
  isactive: { type: Boolean, default: true },
  isadditional: { type: Boolean, default: false }, // Marks subject as additional (not part of main scholastic area)

  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now }
}, { timestamps: true });

// Unique constraint
subjectcomponentconfig9dsschema.index({
  colid: 1,
  subjectcode: 1,
  semester: 1,
  academicyear: 1
}, { unique: true });

const subjectcomponentconfig9ds = mongoose.model('subjectcomponentconfig9ds', subjectcomponentconfig9dsschema);

module.exports = subjectcomponentconfig9ds;
