const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: String },
  colid: { type: Number },
  drugCode: {
    type: String,
    unique: true
  },
  drugName: {
    type: String,
    required: true
  },
  genericName: String,
  category: {
    type: String,
    enum: ['Tablet', 'Syrup', 'Injection', 'Capsule', 'Ointment', 'Drops', 'Other']
  },
  manufacturer: String,
  batchNumber: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  unitPrice: {
    type: Number,
    required: true
  },
  reorderLevel: {
    type: Number,
    default: 10
  },
  location: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Remove the auto-generate code from here
// We'll generate it in the seed file instead

module.exports = mongoose.model('Drug', drugSchema);
