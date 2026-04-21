const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: String },
  colid: { type: Number },
  
  doctorId: {
    type: String,
    unique: true
  },
  doctor: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  qualification: {
    type: String
  },
  experience: {
    type: Number
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  consultationFee: {
    type: Number,
    default: 500
  },
  department: {
    type: String
  },
  
  // Updated Schedule with slot management
  schedule: [{
    day: String,
    startTime: String,
    endTime: String,
    slotDuration: {
      type: Number,
      default: 15  // minutes
    },
    maxPatientsPerSlot: {
      type: Number,
      default: 1
    }
  }],
  
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto-generate Doctor ID
doctorSchema.pre('save', async function(next) {
  if (!this.doctorId) {
    const count = await mongoose.model('Doctor').countDocuments();
    this.doctorId = `DOC${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema);
