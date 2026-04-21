const mongoose = require('mongoose');

const labOrderSchema = new mongoose.Schema({
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
  
  tests: [{
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LabTest',
      required: true
    },
    testName: String,
    price: Number,
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending'
    },
    results: String,
    normalRange: String
  }],
  
  totalAmount: {
    type: Number,
    required: true
  },
  
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  
  orderDate: {
    type: Date,
    default: Date.now
  },
  
  completedDate: Date,
  notes: String
}, {
  timestamps: true
});

// Auto-generate Order Number
labOrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('LabOrder').countDocuments({ colid: this.colid });
    this.orderNumber = `LAB${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('LabOrder', labOrderSchema);
