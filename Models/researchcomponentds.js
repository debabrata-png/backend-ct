const mongoose = require("mongoose");

const ResearchComponentSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  component: { type: String, required: true },
  description: String,
  status: { type: String, default: "Active" },
  name: String,
  user: String
}, { timestamps: true });

ResearchComponentSchema.index({ colid: 1, component: 1 });

module.exports = mongoose.model("researchcomponentds", ResearchComponentSchema);
