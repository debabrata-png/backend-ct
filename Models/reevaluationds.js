const mongoose = require('mongoose');

const reevaluationdsschema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  colid: { type: Number, required: true },
  student: { type: String, required: true },
  regno: { type: String, required: true },
  program: { type: String },
  examcode: { type: String },
  month: { type: String },
  year: { type: String },
  regulation: { type: String },
  semester: { type: String },
  branch: { type: String },
  papercode: { type: String },
  papername: { type: String },
  
  // Original marks (THEORY ONLY)
  originalmarks: { type: Number },
  maxmarks: { type: Number }, // Added for theory max marks
  
  // Examiner marks
  examiner1marks: { type: Number },
  examiner2marks: { type: Number },
  examiner3marks: { type: Number },
  
  // Status tracking
  examiner1status: { type: String, default: 'pending' }, // pending, completed
  examiner2status: { type: String, default: 'pending' },
  examiner3status: { type: String, default: 'pending' },
  
  // Final status
  status: { type: String, default: 'pending' }, // pending, stage1, stage2, completed
  finalmarks: { type: Number },
  
  applieddate: { type: Date, default: Date.now },
  completeddate: { type: Date },
});

const reevaluationds = mongoose.model('reevaluationds', reevaluationdsschema);
module.exports = reevaluationds;

