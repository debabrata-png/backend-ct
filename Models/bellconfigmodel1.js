const mongoose = require('mongoose');

const bellConfigSchema = new mongoose.Schema({
    colid: Number,

    useNormalization: { type: Boolean, default: false },
    targetMean: { type: Number, default: 50 },
    targetStdDev: { type: Number, default: 10 },

    grades: [
        {
            grade: String,
            minZ: Number,
            maxZ: Number,
            gradepoint: Number
        }
    ]
});

module.exports = mongoose.model('bellconfigmodel1', bellConfigSchema);