const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    sectionid: { type: String, default: "" },
    section: { type: String, default: "" },
    questionid: { type: String, default: "" },
    question: { type: String, default: "" },
    type: { type: String, default: "" },
    answer: { type: String, default: "" },
    score: { type: Number, default: 0 },
    sentiment: { type: String, default: "" },
    sentimentcomment: { type: String, default: "" }
  },
  { _id: false }
);

const feedbackAdvancedResponseSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    academicyear: { type: String, required: true, index: true },
    formid: { type: String, required: true, index: true },
    formtitle: { type: String, default: "" },
    respondentname: { type: String, default: "" },
    respondentemail: { type: String, default: "" },
    respondentphone: { type: String, default: "" },
    submitteddate: { type: Date, default: Date.now },
    answers: { type: [answerSchema], default: [] },
    sentimentanalysis: { type: [mongoose.Schema.Types.Mixed], default: [] },
    user: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedbackadvancedresponseds", feedbackAdvancedResponseSchema);
