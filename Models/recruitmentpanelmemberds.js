const mongoose = require('mongoose');

const RecruitmentPanelMemberSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  panelid: { type: String, required: true, index: true },
  panelname: { type: String, default: '' },
  membername: { type: String, required: true },
  memberemail: { type: String, required: true },
  memberphone: { type: String, default: '' },
  designation: { type: String, default: '' },
  department: { type: String, default: '' },
  qualification: { type: String, default: '' },
  remunerationtype: { type: String, default: '' },
  remunerationamount: { type: Number, default: 0 },
  remarks: { type: String, default: '' },
  user: { type: String, default: '' }
}, { timestamps: true });

RecruitmentPanelMemberSchema.index({ colid: 1, panelid: 1, memberemail: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentpanelmemberds', RecruitmentPanelMemberSchema);
