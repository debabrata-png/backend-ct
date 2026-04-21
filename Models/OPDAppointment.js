const mongoose = require('mongoose');

const opdAppointmentSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: String },
  colid: { type: Number },
  
  appointmentNumber: {
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
  
  // Appointment Details
  appointmentDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  
  // Doctor Details
  specialization: {
    type: String,
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  
  // Payment Details
  consultationFee: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial'],
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
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'UPI', 'Insurance'],
    default: 'Cash'
  },
  
  // Appointment Status
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled', 'No Show'],
    default: 'Scheduled'
  },
  
  // Tracking
  checkInTime: Date,
  checkOutTime: Date,
  prescriptionCreated: {
    type: Boolean,
    default: false
  },
  prescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },
  
  // Additional
  notes: String,
  cancelReason: String
  
}, {
  timestamps: true
});

// Auto-generate Appointment Number
opdAppointmentSchema.pre('save', async function(next) {
  if (!this.appointmentNumber) {
    const count = await mongoose.model('OPDAppointment').countDocuments({ colid: this.colid });
    this.appointmentNumber = `OPD${String(count + 1).padStart(6, '0')}`;
  }
  
  // Calculate balance
  this.balanceAmount = this.consultationFee - this.paidAmount;
  
  next();
});

module.exports = mongoose.model('OPDAppointment', opdAppointmentSchema);
