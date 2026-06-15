const mongoose = require('mongoose');

const hrTdsDepositSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  employeeid: { type: String, default: '' },
  employee: { type: String, default: '' },
  employeeemail: { type: String, required: true, index: true },
  empid: { type: String, default: '', index: true },
  taxperiod: { type: String, required: true },
  tdsamount: { type: Number, default: 0 },
  bsrcode: { type: String, default: '' },
  challanserialno: { type: String, default: '' },
  datedeposited: Date,
  remarks: { type: String, default: '' },
  user: { type: String, default: '' }
}, { timestamps: true });

hrTdsDepositSchema.index({ colid: 1, empid: 1, taxperiod: 1 }, { unique: true });

module.exports = mongoose.model('hrtdsdepositds', hrTdsDepositSchema);
