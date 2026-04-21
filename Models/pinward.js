const mongoose = require('mongoose');

const InwardSchema = new mongoose.Schema({
  colid: Number,

  poid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ppo'
  },

  qualityid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pquality'
  },

  vendorname: String,
  vehicleno: String,
  drivername: String,

  items: [
    {
      itemname: String,
      receivedqty: Number
    }
  ],

  inwarddate: {
    type: Date,
    default: Date.now
  },

  remarks: String

}, { timestamps: true });

module.exports = mongoose.model('pinward', InwardSchema);