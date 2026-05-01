const mongoose = require('mongoose');

const POShipmentBatchSchema = new mongoose.Schema({
  colid: Number,

  poid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ppo'
  },

  itemname: String,
  description: String,
  poquantity: Number,
  expecteddate: Date,
  expectedqty: Number,
  receivedqty: {
    type: Number,
    default: 0
  },
  acceptedqty: {
    type: Number,
    default: 0
  },
  returnedqty: {
    type: Number,
    default: 0
  },
  stockpostedqty: {
    type: Number,
    default: 0
  },
  storeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pstore'
  },
  checked: {
    type: String,
    default: 'Not checked'
  },
  vehicleno: String,
  drivername: String,
  transporter: String,
  gatepassremarks: String,
  goodsreturnno: String,
  outwardgatepassno: String,
  returndate: Date,
  inspectionremarks: String,
  remarks: String,
  status: {
    type: String,
    default: 'Expected'
  },
  user: String,
  receivedby: String,
  receiveddate: Date
}, { timestamps: true });

module.exports = mongoose.model('pposhipmentbatch', POShipmentBatchSchema);
