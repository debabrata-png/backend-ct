// models/DonationReceipt.js
const mongoose = require('mongoose');

const donationReceiptSchema = new mongoose.Schema({
  receiptNo: {
    type: String,
    unique: true,
  },
  trustRegNo: {
    type: String,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
  trustAddress: {
    type: String,
    // required: true,
  },
  trustPhone: {
    type: String,
    // required: true,
  },
  trustEmail: {
    type: String,
    // required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  donorAddress: {
    type: String,
    // required: true,
  },
  donorMobile: {
    type: String,
    required: true,
  },
  donorEmail: {
    type: String,
    // required: true,
  },
  amountReceived: {
    type: Number,
    required: true,
  },
  amountInWords: {
    type: String,
    required: true,
  },
  modeOfPayment: {
    type: String,
    enum: ['cash', 'bank', 'online'], // Updated enum to match frontend 'online' value
    required: true,
  },
  chequeNo: { type: String, },
  bankName: { type: String },
  chequeDate: { type: String },
  upiId: { type: String },
  upiDate: { type: String },
  purposeOfDonation: {
    type: String,
    // required: true,
  },
  otherPurpose: String,
  name: {
    type: String
  },
  user: {
    type: String
  },
  colid: {
    type: Number
  }
}, {
  timestamps: true,
});

const vssdonationformds = mongoose.model('vssdonationformds', donationReceiptSchema);
module.exports = vssdonationformds;
