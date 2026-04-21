const mongoose = require('mongoose');

const coScholasticActivity9Schema = new mongoose.Schema({
    colid: { type: Number, required: true },
    code: { type: String, trim: true },
    activityname: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    semester: { type: String, required: true },
    academicyear: { type: String, required: true },
    isactive: { type: Boolean, default: true },
    createdat: { type: Date, default: Date.now }
});

// Composite index to prevent duplicates
coScholasticActivity9Schema.index({ colid: 1, activityname: 1, semester: 1, academicyear: 1 }, { unique: true });

module.exports = mongoose.model('CoScholasticActivity9ds', coScholasticActivity9Schema);
