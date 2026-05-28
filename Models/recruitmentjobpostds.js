const mongoose = require('mongoose');

const RecruitmentJobPostSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  jobid: { type: String, required: true },
  title: { type: String, required: true },
  department: { type: String, default: '' },
  location: { type: String, default: '' },
  employmenttype: { type: String, default: '' },
  openings: { type: Number, default: 1 },
  salaryrange: { type: String, default: '' },
  description: { type: String, default: '' },
  eligibility: { type: String, default: '' },
  skills: { type: String, default: '' },
  formid: { type: String, default: '' },
  status: { type: String, default: 'Draft' },
  sharetoken: { type: String, default: '' },
  posteddate: Date,
  lastdate: Date,
  user: { type: String, default: '' },
  createdByName: { type: String, default: '' }
}, { timestamps: true });

RecruitmentJobPostSchema.index({ colid: 1, jobid: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentjobpostds', RecruitmentJobPostSchema);
