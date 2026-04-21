const mongoose = require('mongoose');

const gatewaypassdsschema = new mongoose.Schema({
  regno: { type: String, required: true },
  studentname: { type: String, required: true },
  colid: { type: Number, required: true },
  gooutdate: { type: Date, required: true },
  goouttime: { type: String, required: true },
  returndate: { type: Date, required: true },
  returntime: { type: String, required: true },
  reason: { type: String, required: true },
  destination: { type: String, required: true },
  parentstatus: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  wardenstatus: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  overallstatus: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  parentemail: { type: String },
  approvaltoken: { type: String, unique: true },
  parentapprovaldate: { type: Date },
  wardenapprovaldate: { type: Date },
  parentrejectionreason: { type: String },
  wardenrejectionreason: { type: String }
}, { timestamps: true });

const gatewaypassds = mongoose.model('gatewaypassds', gatewaypassdsschema);

module.exports = gatewaypassds;
