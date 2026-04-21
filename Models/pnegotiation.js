const mongoose = require('mongoose');

const NegotiationSchema = new mongoose.Schema({
  colid: Number,

  rfpid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfp' },
  vendorid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfpvendor' },

  date: { type: Date, default: Date.now },

  discussion: String,
  remarks: String

}, { timestamps: true });

module.exports = mongoose.model('pnegotiation', NegotiationSchema);