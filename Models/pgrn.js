const mongoose = require('mongoose');

const GRNSchema = new mongoose.Schema({
  colid: Number,

  poid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ppo'
  },

  qualityid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pquality'
  },

  items: [
    {
      itemname: String,
      receivedqty: Number
    }
  ],

  grndate: {
    type: Date,
    default: Date.now
  },

  remarks: String

}, { timestamps: true });

module.exports = mongoose.model('pgrn', GRNSchema);