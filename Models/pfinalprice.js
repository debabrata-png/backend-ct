const mongoose = require('mongoose');

const FinalPriceSchema = new mongoose.Schema({
  colid: Number,

  rfpid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfp' },
  vendorid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfpvendor' },

  items: [
    {
      itemname: String,
      finalprice: Number
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('pfinalprice', FinalPriceSchema);