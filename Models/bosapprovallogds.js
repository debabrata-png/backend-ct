const mongoose = require("mongoose");

const bosApprovalLogSchema = new mongoose.Schema(
  {
    reviewid: { type: mongoose.Schema.Types.ObjectId, ref: "boscoursereviewds", required: true },
    cycleid: { type: mongoose.Schema.Types.ObjectId, ref: "boscycleds" },
    level: { type: Number, default: 1 },
    action: { type: String, trim: true, default: "Apply" },
    comments: { type: String, default: "" },
    username: { type: String, trim: true, default: "" },
    useremail: { type: String, trim: true, default: "" },
    timeofactivity: { type: Date, default: Date.now },
    colid: { type: Number, required: true, index: true }
  },
  { timestamps: true }
);

bosApprovalLogSchema.index({ colid: 1, reviewid: 1, cycleid: 1, level: 1 });

module.exports = mongoose.model("bosapprovallogds", bosApprovalLogSchema);
