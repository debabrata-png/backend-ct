const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: String },
  colid: { type: Number },
  testCode: {
    type: String,
    unique: true
  },
  testName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ['Pathology', 'Radiology', 'Microbiology', 'Biochemistry'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  normalRange: String,
  unit: String,
  turnaroundTime: String,
  sampleType: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Remove the auto-generate code from here
// We'll generate it in the seed file instead

module.exports = mongoose.model('LabTest', labTestSchema);
