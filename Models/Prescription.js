const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: String },
  colid: { type: Number },
  
  prescriptionNumber: {
    type: String,
    unique: true
  },
  
  // References
  opdAppointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OPDAppointment',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  
  // Doctor Details (for PDF)
  doctorDetails: {
    name: String,
    specialization: String,
    qualification: String,
    phone: String,
    email: String
  },
  
  // Patient Details (for PDF)
  patientDetails: {
    name: String,
    age: Number,
    gender: String,
    phone: String,
    mrNumber: String
  },
  
  // Clinical Information
  chiefComplaint: {
    type: String,
    required: true
  },
  symptoms: [String],
  
  vitals: {
    bloodPressure: String,
    temperature: String,
    pulse: String,
    weight: String,
    spo2: String
  },
  
  diagnosis: {
    type: String,
    required: true
  },
  
  // Medications
  medications: [{
    drugId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drug'
    },
    drugName: {
      type: String,
      required: true
    },
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String,
    source: {
      type: String,
      enum: ['Database', 'Manual'],
      default: 'Manual'
    }
  }],
  
  // Lab Tests
  labTests: [{
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LabTest'
    },
    testName: {
      type: String,
      required: true
    },
    notes: String,
    source: {
      type: String,
      enum: ['Database', 'Manual'],
      default: 'Manual'
    }
  }],
  
  // Additional
  notes: String,
  followUpDate: Date,
  followUpNotes: String
  
}, {
  timestamps: true
});

// Auto-generate Prescription Number
prescriptionSchema.pre('save', async function(next) {
  if (!this.prescriptionNumber) {
    const count = await mongoose.model('Prescription').countDocuments({ colid: this.colid });
    this.prescriptionNumber = `PRX${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
