const mongoose = require('mongoose');

// Case Schema
const lawformschema = new mongoose.Schema({
  slno: { type: String, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'lawuserds', required: true },
  useremail: { type: String, required: true }, 
  caseregtype: { type: String, required: true },
  caseno: { type: String, required: true },
  partyname: { type: String, required: true },
  plaintiffname: { type: String, required: true },
  defendantname: { type: String, required: true },
  clientphnop: { type: String, required: true },
  clientphnos: { type: String },
  cisno: { type: String },
  cnrno: { type: String },
  nextdateforhearing: { type: Date, required: true },
  nextdateforhearingtime: { type: String },
  datefor: { type: Date, required: true },
  lawclerkname: { type: String, required: true },
  lawclerkphno: { type: String, required: true },
  rackno: { type: String, required: true },
  colid: {type: Number, required: true},
}, {
  timestamps: true
});

const lawformds = mongoose.model("lawformds", lawformschema);
module.exports = lawformds;
