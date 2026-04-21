const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  colid: Number,

  poid: { type: mongoose.Schema.Types.ObjectId, ref: 'ppo' },

  invoiceno: String,
  invoicedate: Date,

  items: [
    {
      itemname: String,
      qty: Number,
      price: Number,
      total: Number
    }
  ],

  totalamount: Number,

  grnverified: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    default: 'PENDING' // VERIFIED / PARTIAL_PAID / PAID
  }

}, { timestamps: true });

module.exports = mongoose.model('pinvoice', InvoiceSchema);