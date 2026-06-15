const mongoose = require('mongoose');

const RecruitmentApprovalLevelSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  jobid: { type: String, required: true, index: true },
  jobtitle: { type: String, default: '' },
  level: { type: Number, required: true },
  approverrole: { type: String, default: '' },
  approvername: { type: String, default: '' },
  approveremail: { type: String, default: '' },
  description: { type: String, default: '' },
  isactive: { type: String, default: 'Yes' },
  user: { type: String, default: '' }
}, { timestamps: true });

RecruitmentApprovalLevelSchema.index({ colid: 1, jobid: 1, level: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentapprovallevelds', RecruitmentApprovalLevelSchema);
