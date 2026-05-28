const mongoose = require('mongoose');

const PlacementLeadStageSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  stage: { type: String, required: true, index: true },
  description: { type: String, default: '' },
  isactive: { type: String, default: 'Yes', index: true },
  order: { type: Number, default: 0 },
  user: { type: String, default: '' }
}, { timestamps: true });

PlacementLeadStageSchema.index({ colid: 1, stage: 1 }, { unique: true });

module.exports = mongoose.model('placementleadstageds', PlacementLeadStageSchema);
