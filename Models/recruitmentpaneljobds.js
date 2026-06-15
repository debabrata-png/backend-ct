const mongoose = require('mongoose');

const RecruitmentPanelJobSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  panelid: { type: String, required: true, index: true },
  panelname: { type: String, default: '' },
  jobid: { type: String, required: true, index: true },
  jobtitle: { type: String, default: '' },
  department: { type: String, default: '' },
  status: { type: String, default: 'Active' },
  remarks: { type: String, default: '' },
  user: { type: String, default: '' }
}, { timestamps: true });

RecruitmentPanelJobSchema.index({ colid: 1, panelid: 1, jobid: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentpaneljobds', RecruitmentPanelJobSchema);
