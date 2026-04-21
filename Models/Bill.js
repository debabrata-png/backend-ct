const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: String },
  colid: { type: Number },
  billNumber: {
    type: String,
    unique: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  items: [{
    itemType: {
      type: String,
      enum: ['Consultation', 'Lab Test', 'Pharmacy', 'Procedure', 'Other']
    },
    description: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    referenceId: mongoose.Schema.Types.ObjectId
  }],
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'UPI', 'Insurance', 'Credit'],
    default: 'Cash'
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial', 'Cancelled'],
    default: 'Pending'
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  balanceAmount: {
    type: Number,
    default: 0
  },
  generatedBy: {
    type: String
  },
  notes: String
}, {
  timestamps: true
});

// Auto-generate Bill Number
billSchema.pre('save', async function(next) {
  if (!this.billNumber) {
    const count = await mongoose.model('Bill').countDocuments();
    this.billNumber = `BILL${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Bill', billSchema);
