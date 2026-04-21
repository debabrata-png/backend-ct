const mongoose = require('mongoose');

const alumniProfileSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    unique: true
  },
  graduationYear: { type: Number },
  company: { type: String },
  designation: { type: String },
  workExperience: { type: Number }, // In years
  linkedInProfile: { type: String },
  resume: { type: String }, // URL to resume file
  location: { type: String },
  bio: { type: String },
  skills: [String],
  achievements: { type: String },
  currentSalary: { type: Number },
  status: { type: Number, default: 1 }, // 1: Active, 0: Inactive
}, { timestamps: true });

module.exports = mongoose.model('alumniprofileds', alumniProfileSchema);
