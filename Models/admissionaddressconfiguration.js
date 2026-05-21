const mongoose = require('mongoose');

const AdmissionAddressConfigurationSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  country: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  isactive: { type: String, default: 'Yes' },
  user: String
}, { timestamps: true });

AdmissionAddressConfigurationSchema.index({ colid: 1, country: 1, state: 1, district: 1 }, { unique: true });

module.exports = mongoose.model('admissionaddressconfiguration', AdmissionAddressConfigurationSchema);
