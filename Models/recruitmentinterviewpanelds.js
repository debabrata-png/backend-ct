const mongoose = require('mongoose');

const RecruitmentInterviewPanelSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  panelid: { type: String, required: true },
  panelname: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: 'Active' },
  user: { type: String, default: '' },
  createdByName: { type: String, default: '' }
}, { timestamps: true });

RecruitmentInterviewPanelSchema.index({ colid: 1, panelid: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentinterviewpanelds', RecruitmentInterviewPanelSchema);
