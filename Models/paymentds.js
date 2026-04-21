const mongoose = require('mongoose');

const paymentdschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  colid: {
    type: Number,
    required: true
  },
  purchesid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "purchesds",
    required: true
  },
  vendorname: {
    type: String,
    required: true
  },
  productname: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  paymenttype: {
    type: String,
    required: true
  },
  paymentstatus: {
    type: String,
    required: true
  },
  paymentamount: {
    type: Number,
    required: true
  },
  paymentrefno: {
    type: String,
    required: true
  },
  paymentdate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const paymentds = mongoose.model("paymentds", paymentdschema);

module.exports = paymentds;
