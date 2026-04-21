const mongoose = require("mongoose");

const eventdocschema = new mongoose.Schema({
  eventid: { type: mongoose.Schema.Types.ObjectId, ref: 'eventsnew1', required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'eventregistration', required: true },
  colid: {type: Number}
}, { timestamps: true });

const eventdocs = mongoose.model("eventdocs", eventdocschema);

module.exports = eventdocs;