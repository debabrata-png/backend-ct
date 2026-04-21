const mongoose = require("mongoose");

const questioninternalschema1 = new mongoose.Schema({
  questiontext: { type: String, required: true },
  questiontype: { 
    type: String, 
    enum: ['text', 'textarea', 'rating'], 
    default: 'text' 
  },
  isrequired: { type: Boolean, default: true },
  // New CO/PO fields
  co: { type: String }, // Course Outcome identifier
  po: { type: String }  // Program Outcome identifier
});

const feedbackinternalschema1 = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [questioninternalschema1],
    colid: { type: Number, required: true },
    programcode: { type: String },
    coursecode: { type: String },
    year: { type: String },
    semester: { type: String }
  },
  { timestamps: true }
);

const feedbackinternalds1 = mongoose.model("feedbackinternalds1", feedbackinternalschema1);
module.exports = feedbackinternalds1;
