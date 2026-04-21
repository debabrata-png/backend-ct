const mongoose = require('mongoose');

const pharmacyOrderSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: String },
  colid: { type: Number },
  
  orderNumber: {
    type: String,
    unique: true
  },
  
  // Patient Reference (if from DB)
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  
  // Manual Patient Details (if not in system)
  patientDetails: {
    name: String,
    phone: String,
    age: Number,
    gender: String
  },
  
  items: [{
    drugId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drug',
      required: true
    },
    drugName: String,
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: Number,
    totalPrice: Number
  }],
  
  totalAmount: {
    type: Number,
    required: true
  },
  
  status: {
    type: String,
    enum: ['Pending', 'Dispensed', 'Cancelled'],
    default: 'Pending'
  },
  
  orderDate: {
    type: Date,
    default: Date.now
  },
  
  dispensedDate: Date,
  notes: String
}, {
  timestamps: true
});

// Auto-generate Order Number
pharmacyOrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('PharmacyOrder').countDocuments({ colid: this.colid });
    this.orderNumber = `PH${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('PharmacyOrder', pharmacyOrderSchema);
