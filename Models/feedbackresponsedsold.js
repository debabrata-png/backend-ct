const mongoose = require("mongoose");

const feedbackResponseSchema = new mongoose.Schema(
  {
    feedbackid: { type: mongoose.Schema.Types.ObjectId, ref: "feedbackmodelds", required: true },
    respondentname: { type: String, required: true },
    respondentemail: { type: String, required: true },
    responses: { type: mongoose.Schema.Types.Mixed },
    colid: { type: Number, required: true }
  },
  { timestamps: true }
);

const feedbackresponseds = mongoose.model("feedbackresponseds", feedbackResponseSchema);
module.exports = feedbackresponseds;
