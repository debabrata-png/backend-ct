const mongoose = require('mongoose');

const IndBudgetApprovalRoleSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  role: { type: String, required: true },
  level: { type: Number, required: true },
  isactive: { type: String, default: 'Yes' },
  user: { type: String },
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('indbudgetapprovalrole', IndBudgetApprovalRoleSchema);
