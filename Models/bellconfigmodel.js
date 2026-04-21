const mongoose = require('mongoose');

const bellConfigSchema = new mongoose.Schema({
    colid: Number,

    useNormalization: { type: Boolean, default: false },
    targetMean: Number,
    targetStdDev: Number,

    grades: [
        {
            grade: String,
            minZ: Number,
            maxZ: Number,
            gradepoint: Number
        }
    ]
});

module.exports = mongoose.model('bellConfig', bellConfigSchema);