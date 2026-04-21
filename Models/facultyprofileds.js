// Models/facultyProfileds.js
const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
    institution: { 
        type: String, 
        required: true,
        trim: true
    },
    position: { 
        type: String, 
        required: true,
        trim: true
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date,
        default: null
    },
    description: { 
        type: String,
        trim: true,
        default: ''
    },
    isCurrent: { 
        type: Boolean, 
        default: false 
    }
}, { 
    _id: true,  // Allow MongoDB to auto-generate _id
    timestamps: false 
});

const facultyProfileSchema = new mongoose.Schema({
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    aboutMe: { type: String, default: '' },
    currentInstitution: { type: String, default: '' },
    designation: { type: String, default: '' },
    workExperience: [workExperienceSchema],
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    researchInterests: { type: Array, default: [] },
    socialLinks: { type: Object, default: {} },
    achievements: { type: Array, default: [] },
    profileVisibility: { 
        type: String, 
        enum: ['college-only', 'public', 'private'], 
        default: 'college-only' 
    }
}, { 
    timestamps: true 
});

// Create unique compound index
facultyProfileSchema.index({ user: 1, colid: 1 }, { unique: true });

const facultyProfileds = mongoose.model('facultyprofileds', facultyProfileSchema);
module.exports = facultyProfileds