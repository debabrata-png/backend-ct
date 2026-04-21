const mongoose = require("mongoose");

const feedbackinternalresponseschema = new mongoose.Schema(
  {
    feedbackid: { type: mongoose.Schema.Types.ObjectId, ref: "feedbackinternalds", required: true },
    respondentname: { type: String, required: true },
    respondentemail: { type: String, required: true },
    respondentregno: { type: String },
    programcode: { type: String },
    coursecode: { type: String },
    year: { type: String },
    semester: { type: String },
    responses: { type: mongoose.Schema.Types.Mixed }, 
    colid: { type: Number, required: true }
  },
  { timestamps: true }
);

const feedbackinternalresponseds = mongoose.model("feedbackinternalresponseds", feedbackinternalresponseschema);
module.exports = feedbackinternalresponseds;
