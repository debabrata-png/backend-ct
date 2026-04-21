const mongoose = require('mongoose');

const buildingstaffdsschema = new mongoose.Schema({
  buildingname: { type: String, required: true },
  colid: { type: Number, required: true },
  wardenemail: { type: String },
  wardenname: { type: String },
  wardenphone: { type: String },
  messmanageremail: { type: String },
  messmanagername: { type: String },
  messmanagerphone: { type: String },
  messstatus: { 
    type: String, 
    enum: ['Open', 'Closed'], 
    default: 'Closed' 
  },
  messfeepermonth: { type: Number, default: 0 },
  user: { type: String }, // who configured
  username: { type: String }
}, { timestamps: true });

const buildingstaffds = mongoose.model('buildingstaffds', buildingstaffdsschema);

module.exports = buildingstaffds;
