const mongoose = require("mongoose");

const bosCycleSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: "" },
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

bosCycleSchema.index({ colid: 1, academicyear: 1, title: 1 });

module.exports = mongoose.model("boscycleds", bosCycleSchema);
