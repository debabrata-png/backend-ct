const mongoose = require("mongoose");

const profileEditConfigSchema = new mongoose.Schema({
  colid: {
    type: Number,
    required: true,
  },
  
  // Global editing toggle
  isEditingEnabled: {
    type: Boolean,
    default: true
  },
  
  // Last date for editing
  lastEditDate: {
    type: Date,
    required: true
  },
  
  // Editable fields configuration
  editableFields: {
    // Personal Info
    phone: { type: Boolean, default: true },
    gender: { type: Boolean, default: true },
    photo: { type: Boolean, default: true },
    category: { type: Boolean, default: true },
    address: { type: Boolean, default: true },
    quota: { type: Boolean, default: true },
    dob: { type: Boolean, default: true },
    
    // Family Info
    fathername: { type: Boolean, default: true },
    mothername: { type: Boolean, default: true },
    
    // Academic Info
    eligibilityname: { type: Boolean, default: true },
    degree: { type: Boolean, default: true },
    minorsub: { type: Boolean, default: true },
    vocationalsub: { type: Boolean, default: true },
    mdcsub: { type: Boolean, default: true },
    othersub: { type: Boolean, default: true },
    
    // Merit/Scholarship
    merit: { type: Boolean, default: true },
    obtain: { type: Boolean, default: true },
    bonus: { type: Boolean, default: true },
    weightage: { type: Boolean, default: true },
    ncctype: { type: Boolean, default: true },
    isdisabled: { type: Boolean, default: true },
    scholarship: { type: Boolean, default: true }
  },
  
  // Audit fields
  updatedBy: {
    name: { type: String },
    email: { type: String }
  },
  
  notes: {
    type: String
  }
  
}, { 
  timestamps: true 
});

// Index for faster queries
profileEditConfigSchema.index({ colid: 1 });

const profileeditconfigds = mongoose.model("profileeditconfigds", profileEditConfigSchema);

module.exports = profileeditconfigds;
