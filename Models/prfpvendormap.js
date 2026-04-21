const mongoose = require('mongoose');

const RfpVendorMapSchema = new mongoose.Schema({

  colid: Number,

  rfpid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfp' },

  categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'pcategory' },

  vendors: [
    {
      vendorid: { type: mongoose.Schema.Types.ObjectId, ref: 'pvendor' },
      vendorname: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('prfpvendormap', RfpVendorMapSchema);