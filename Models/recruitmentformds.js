const mongoose = require('mongoose');

const RecruitmentFormSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  formid: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  isactive: { type: String, default: 'Yes' },
  user: { type: String, default: '' }
}, { timestamps: true });

RecruitmentFormSchema.index({ colid: 1, formid: 1 }, { unique: true });

module.exports = mongoose.model('recruitmentformds', RecruitmentFormSchema);
