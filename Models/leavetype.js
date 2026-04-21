const mongoose = require('mongoose');

const leavetypeschema = new mongoose.Schema({
  name: { type: String }, 
  code: { type: String },
  description: { type: String },
  isactive: { type: Boolean, default: true },
  colid: {type: Number}
}, { timestamps: true });

const LeaveType = mongoose.model('LeaveType', leavetypeschema);

module.exports = LeaveType;