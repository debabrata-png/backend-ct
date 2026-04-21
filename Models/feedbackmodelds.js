const mongoose = require("mongoose");

const questionschema = new mongoose.Schema({
  questiontext: { type: String, required: true },
  questiontype: { 
    type: String, 
    enum: ['text', 'textarea', 'rating'], 
    default: 'text' 
  },
  isrequired: { type: Boolean, default: true }
});

const feedbackschema = new mongoose.Schema(
  {
    name: {type: String},
    user: {type: String},
    title: { type: String, required: true },
    description: { type: String },
    questions: [questionschema],
    colid: { type: Number, required: true },
  },
  { timestamps: true }
);

const feedbackmodelds = mongoose.model("feedbackmodelds", feedbackschema);
module.exports = feedbackmodelds;
