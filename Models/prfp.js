const mongoose = require('mongoose');

const RfpSchema = new mongoose.Schema({
  colid: Number,

  storeid: { type: mongoose.Schema.Types.ObjectId, ref: 'pstore' },
  categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'pcategory' },

  // multiple items from indent
  items: [
    {
      indentid: { type: mongoose.Schema.Types.ObjectId, ref: 'pindent' },
      itemname: String,
      quantity: Number,
      description: String
    }
  ],

  status: {
    type: String,
    default: 'OPEN' // OPEN / CLOSED
  }

}, { timestamps: true });

module.exports = mongoose.model('prfp', RfpSchema);