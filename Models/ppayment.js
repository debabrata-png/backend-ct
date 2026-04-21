const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  colid: Number,

  invoiceid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pinvoice'
  },

  amount: Number,
  paymentdate: {
    type: Date,
    default: Date.now
  },

  mode: String, // CASH / BANK / UPI
  remarks: String

}, { timestamps: true });

module.exports = mongoose.model('ppayment', PaymentSchema);