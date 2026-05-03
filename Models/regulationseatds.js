const mongoose = require("mongoose");

const regulationSeatSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    regulationid: { type: String, trim: true },
    regulation: { type: String, trim: true, required: true },
    program: { type: String, trim: true, required: true },
    programcode: { type: String, trim: true },
    subject: { type: String, trim: true, required: true },
    type: {
      type: String,
      enum: ["Major", "Minor", "AEC", "SEC", "VAC", "IDC"],
      required: true
    },
    category: {
      type: String,
      enum: ["General", "SC", "ST", "OBC", "EWS", "EBC", "PH", "Sports", "Supernumerary"],
      required: true
    },
    noofseats: { type: Number, default: 0 },
    samestate: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes"
    },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

regulationSeatSchema.index({ colid: 1, academicyear: 1, regulation: 1, programcode: 1, subject: 1, type: 1, category: 1, samestate: 1 });

module.exports = mongoose.model("regulationseatds", regulationSeatSchema);
