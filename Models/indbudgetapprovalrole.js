const mongoose = require('mongoose');

const IndBudgetApprovalRoleSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  academicyear: { type: String, default: 'All' },
  role: { type: String, required: true },
  department: { type: String, default: 'All' },
  level: { type: Number, required: true },
  accesslevel: { type: String, default: 'Approve Only' },
  isactive: { type: String, default: 'Yes' },
  user: { type: String },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('indbudgetapprovalrole', IndBudgetApprovalRoleSchema);
