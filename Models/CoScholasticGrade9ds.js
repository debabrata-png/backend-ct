const mongoose = require('mongoose');

const coScholasticGrade9Schema = new mongoose.Schema({
    colid: { type: Number, required: true },
    regno: { type: String, required: true }, // Student Admission No
    academicyear: { type: String, required: true },
    semester: { type: String, required: true }, // Class
    activityid: { type: mongoose.Schema.Types.ObjectId, ref: 'CoScholasticActivity9ds', required: true },

    term1grade: { type: String, trim: true },
    term2grade: { type: String, trim: true },

    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now }
});

// Index for fast lookup by student and activity
coScholasticGrade9Schema.index({ colid: 1, regno: 1, academicyear: 1, activityid: 1 }, { unique: true });

module.exports = mongoose.model('CoScholasticGrade9ds', coScholasticGrade9Schema);
