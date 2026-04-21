const mongoose = require('mongoose');

const QualitySchema = new mongoose.Schema({
  colid: Number,

  poid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ppo'
  },

  items: [
    {
      itemname: String,
      orderedqty: Number,
      receivedqty: Number
    }
  ],

  remarks: String,

  status: {
    type: String,
    default: 'RECEIVED'
  }

}, { timestamps: true });

module.exports = mongoose.model('pquality', QualitySchema);