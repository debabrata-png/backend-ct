const mongoose = require("mongoose");

const hrLeaveCycleSchema = new mongoose.Schema(
  {
    cyclename: { type: String, trim: true, required: true },
    resetmonth: { type: Number, default: 1 },
    resetday: { type: Number, default: 1 },
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

hrLeaveCycleSchema.index({ colid: 1, cyclename: 1 }, { unique: true });

module.exports = mongoose.model("hrleavecycleds", hrLeaveCycleSchema);
