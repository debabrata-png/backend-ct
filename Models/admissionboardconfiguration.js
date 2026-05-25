const mongoose = require('mongoose');

const AdmissionBoardConfigurationSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  level: { type: String, required: true, trim: true },
  board: { type: String, required: true, trim: true },
  isactive: { type: String, default: 'Yes' },
  user: String
}, { timestamps: true });

AdmissionBoardConfigurationSchema.index({ colid: 1, level: 1, board: 1 }, { unique: true });

module.exports = mongoose.model('admissionboardconfiguration', AdmissionBoardConfigurationSchema);
