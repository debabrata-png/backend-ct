const mongoose = require('mongoose');

const returndschema = new mongoose.Schema({
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
  purchasedquantity: {
    type: Number,
    required: true
  },
  returnquantity: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  returndate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const returnproductds = mongoose.model("returnproducts", returndschema);
module.exports = returnproductds;