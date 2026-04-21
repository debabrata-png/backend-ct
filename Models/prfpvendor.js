const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  colid: Number,

  rfpid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfp' },

  vendorid: String,
  vendorname: String,
  email: String,
  phone: String,

  transport: Number,
  loadingfees:Number,
  pandffees:Number,
  gst:Number,
  total:Number,
  warranty:String,
  workschedule:String,
  paymentterms:String,
  remark:String,

  technicaldetails: String,

  items: [
    {
      itemname: String,
      price: Number
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('prfpvendor', VendorSchema);