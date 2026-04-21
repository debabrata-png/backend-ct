const mongoose = require("mongoose");

const admitcardschema = new mongoose.Schema({
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdmitCardTemplate",
    required: true,
  },
  examCenter: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false
});

const admitcardmodel = mongoose.model("AdmitCard", admitcardschema);

module.exports = admitcardmodel;