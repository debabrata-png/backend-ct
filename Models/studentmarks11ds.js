const mongoose = require('mongoose');

const studentmarks11dsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },

    // Student identification
    regno: { type: String, required: true },
    studentname: { type: String },

    // Subject identification
    subjectcode: { type: String, required: true },
    subjectname: { type: String },

    // Academic context
    semester: { type: String, required: true },
    academicyear: { type: String, required: true },

    unitpremidobtain: { type: Number },
    unitpostmidobtain: { type: Number },
    unittotal: { type: Number },
    unit20: { type: Number },

    halfyearlythobtain: { type: Number },
    halfyearlypracticalobtain: { type: Number },
    halfyearlytotal: { type: Number },
    halfyearly30: { type: Number },

    annualthobtain: { type: Number },
    annualpracticalobtain: { type: Number },
    annualtotal: { type: Number },
    annual50: { type: Number },

    total: { type: Number },
    totalgrade: { type: String },

    // Attendance
    term1totalworkingdays: { type: Number, default: 0 },
    term1totalpresentdays: { type: Number, default: 0 },
    term2totalworkingdays: { type: Number, default: 0 },
    term2totalpresentdays: { type: Number, default: 0 },

    // Status
    status: { type: String, default: 'draft' },

    // Compartment / Supplementary Exam Marks (does not affect original marks)
    compartmentobtained: { type: Number, default: null },

    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now }
});

// Unique constraint
studentmarks11dsschema.index({
    colid: 1,
    regno: 1,
    subjectcode: 1,
    semester: 1,
    academicyear: 1
}, { unique: true });

const studentmarks11ds = mongoose.model('studentmarks11ds', studentmarks11dsschema);

module.exports = studentmarks11ds;
