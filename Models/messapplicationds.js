const mongoose = require('mongoose');

const messapplicationdsschema = new mongoose.Schema({
  regno: { type: String, required: true },
  studentname: { type: String, required: true },
  buildingname: { type: String, required: true },
  colid: { type: Number, required: true },
  applicationmonth: { type: String, required: true }, // e.g., "2025-10"
  reason: { type: String },
  appstatus: { 
    type: String, 
    enum: ['Approved', 'Pending', 'Rejected'], 
    default: 'Pending' 
  },
  approvedby: { type: String }, // mess manager email
  approvaldate: { type: Date },
  rejectionreason: { type: String }
}, { timestamps: true });

const messapplicationds = mongoose.model('messapplicationds', messapplicationdsschema);

module.exports = messapplicationds;
