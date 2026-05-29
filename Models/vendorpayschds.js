const mongoose = require("mongoose");

const vendorpayschdsschema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String, required: true },
  colid: { type: Number, required: true },
  vendorname: { type: String },
  vendorid: { type: String },
  isadvance: { type: String },
  isdeliverylinked: { type: String },
  deliverytype: { type: String },
  paymenttype: { type: String },
  deliverydesc: { type: String },
  paymentdesc: { type: String },
  status: { type: String },
  remarks: { type: String }
}, { timestamps: true });

const vendorpayschds = mongoose.models.vendorpayschds || mongoose.model("vendorpayschds", vendorpayschdsschema);

module.exports = vendorpayschds;
