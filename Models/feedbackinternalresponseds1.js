const mongoose = require("mongoose");

const feedbackinternalresponseschema1 = new mongoose.Schema(
  {
    feedbackid: { type: mongoose.Schema.Types.ObjectId, ref: "feedbackinternalds1", required: true },
    respondentname: { type: String, required: true },
    respondentemail: { type: String, required: true },
    respondentregno: { type: String },
    programcode: { type: String },
    coursecode: { type: String },
    year: { type: String },
    semester: { type: String },
    responses: { type: mongoose.Schema.Types.Mixed }, // Regular question responses
    coratings: { type: mongoose.Schema.Types.Mixed }, // CO ratings: {CO1: 5, CO2: 4, ...}
    poratings: { type: mongoose.Schema.Types.Mixed }, // PO ratings: {PO1: 3, PO2: 5, ...}
    colid: { type: Number, required: true }
  },
  { timestamps: true }
);

const feedbackinternalresponseds1 = mongoose.model("feedbackinternalresponseds1", feedbackinternalresponseschema1);
module.exports = feedbackinternalresponseds1;
