const mongoose = require('mongoose');

const POSchema = new mongoose.Schema({
  colid: Number,

  rfpid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfp' },
  vendorid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfpvendor' },
  categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'pcategory' },

   transport: Number,
  loadingfees: Number,
  pandffees: Number,
  gst: Number,
  total: Number,
  remark: String,


  vendorname: String,

  items: [
    {
      itemname: String,
      description: String,
      quantity: Number,
      price: Number
    }
  ],

  status: {
    type: String,
    default: 'REGISTRAR_PENDING'
  }

}, { timestamps: true });

module.exports = mongoose.model('ppo', POSchema);