const mongoose = require('mongoose');

const reevaluationds1schema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  user: { type: String, required: true },
  colid: { type: Number, required: true },
  student: { type: String, required: true },
  regno: { type: String, required: true },
  
  // Paper Details
  program: { type: String },
  examcode: { type: String },
  month: { type: String },
  year: { type: String },
  regulation: { type: String },
  semester: { type: String },
  branch: { type: String },
  papercode: { type: String },
  papername: { type: String },
  
  // Marks
  originalmarks: { type: Number },
  maxmarks: { type: Number },
  
  // Examiner Assignment (email/user from examinerconfigds)
  examiner1id: { type: String }, // Email of assigned examiner
  examiner2id: { type: String },
  examiner3id: { type: String },
  
  // Examiner Marks
  examiner1marks: { type: Number },
  examiner2marks: { type: Number },
  examiner3marks: { type: Number },
  
  // Status tracking
  examiner1status: { type: String, default: 'pending' }, // pending, allocated, completed
  examiner2status: { type: String, default: 'pending' },
  examiner3status: { type: String, default: 'pending' },
  
  // Overall Status
  status: { type: String, default: 'pending' }, // pending, stage1, stage2, completed
  
  // Final Result
  finalmarks: { type: Number },
  remarksds: { type: String },
  
  // Dates
  applieddate: { type: Date, default: Date.now },
  completeddate: { type: Date },
});

const reevaluationds1 = mongoose.model('reevaluationds1', reevaluationds1schema);
module.exports = reevaluationds1;
