const mongoose = require("mongoose");

const questioninternalschema = new mongoose.Schema({
  questiontext: { type: String, required: true },
  questiontype: { 
    type: String, 
    enum: ['text', 'textarea', 'rating'], 
    default: 'text' 
  },
  isrequired: { type: Boolean, default: true }
});

const feedbackinternalschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [questioninternalschema],
    colid: { type: Number, required: true },
    programcode: { type: String },
    coursecode: { type: String },
    year: { type: String },
    semester: { type: String }
  },
  { timestamps: true }
);

const feedbackinternalds = mongoose.model("feedbackinternalds", feedbackinternalschema);
module.exports = feedbackinternalds;
