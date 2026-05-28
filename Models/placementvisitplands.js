const mongoose = require('mongoose');

const PlacementVisitPlanSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  leadid: { type: mongoose.Schema.Types.ObjectId, ref: 'placementleadds', required: true, index: true },
  companyname: { type: String, default: '' },
  leadname: { type: String, default: '' },
  leademail: { type: String, default: '' },
  leadphone: { type: String, default: '' },
  assigneduser: { type: String, default: '', index: true },
  assignedname: { type: String, default: '' },
  planneddate: { type: Date, required: true, index: true },
  comments: { type: String, default: '' },
  description: { type: String, default: '' },
  workdone: { type: String, default: '' },
  nextfollowupdate: { type: Date, default: null },
  user: { type: String, default: '' }
}, { timestamps: true });

PlacementVisitPlanSchema.index({ colid: 1, assigneduser: 1, planneddate: 1 });

module.exports = mongoose.model('placementvisitplands', PlacementVisitPlanSchema);
