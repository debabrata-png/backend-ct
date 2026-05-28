const mongoose = require('mongoose');

const PlacementLeadSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  companyname: { type: String, default: '', index: true },
  leadname: { type: String, default: '', index: true },
  leademail: { type: String, default: '', index: true },
  leadphone: { type: String, default: '', index: true },
  leadstatus: { type: String, default: '', index: true },
  completed: { type: String, default: 'No', index: true },
  customfields: { type: mongoose.Schema.Types.Mixed, default: {} },
  user: { type: String, default: '' }
}, { timestamps: true });

PlacementLeadSchema.index({ colid: 1, companyname: 1, leademail: 1 });

module.exports = mongoose.model('placementleadds', PlacementLeadSchema);
