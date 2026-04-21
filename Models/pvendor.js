const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({

  colid: Number,

  vendorname: String,

  username: String,
  password: String, // (plain for now, can hash later)

  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pcategory'
  },

  /* ===== PROFILE (OPTIONAL INITIALLY) ===== */
  email: String,
  phone: String,
  address: String,
  gst: String,
  pan: String,
  bankname: String,
  accountno: String,
  ifsc: String,

  profileCompleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('pvendor', VendorSchema);