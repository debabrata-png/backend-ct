// models/AdmitCardTemplate.js
const mongoose = require("mongoose");

const admitcardtemplateschema = new mongoose.Schema({
    templatename: {
    type: String,
    required: true,
    unique: true, // optional: ensure names are unique
  },
  institutionname: {
    type: String,
    required: true,
    default: "TECH UNIVERSITY"
  },
  programname: {
    type: String,
    required: true,
    default: "Department of Engineering & Technology"
  },
  title: {
    type: String,
    default: "ADMIT CARD"
  },
  instructions: {
    type: [String],
    default: [
      "Bring this admit card to the examination hall",
      "Carry a valid photo ID proof",
      "Report to the examination center 30 minutes before the exam",
      "Electronic devices are strictly prohibited",
      "Follow all COVID-19 safety protocols",
      "Get invigilator signature for each subject after the exam"
    ]
  },
  controllersignaturelabel: {
    type: String,
    default: "Controller of Examinations"
  },
  footertext: {
    type: String,
    default: "" // optional footer message if needed
  },
}, {
    timestamps: true, // automatically manage createdAt and updatedAt fields
    versionKey: false // disable the __v field
});

const admitcardtemplatemodel = mongoose.model("AdmitCardTemplate", admitcardtemplateschema);
module.exports = admitcardtemplatemodel;
