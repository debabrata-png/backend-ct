const mongoose = require('mongoose');

const RecruitmentCandidateStatusSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  status: { type: String, required: true },
  description: { type: String, default: '' },
  isactive: { type: String, default: 'Yes' },
  user: { type: String, default: '' }
}, { timestamps: true });

RecruitmentCandidateStatusSchema.index({ colid: 1, status: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentcandidatestatusds', RecruitmentCandidateStatusSchema);
