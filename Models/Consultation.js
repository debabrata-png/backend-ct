const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: String },
  colid: { type: Number },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  doctorSpecialization: {
    type: String
  },
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
  prescription: [{
    drugName: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  followUpDate: {
    type: Date
  },
  notes: String,
  consultationFee: {
    type: Number,
    default: 500
  },
  status: {
    type: String,
    enum: ['Active', 'Completed'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Consultation', consultationSchema);
