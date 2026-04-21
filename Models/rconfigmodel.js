const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    colid: Number,

    gradingType: {
        type: String,
        enum: ['zscore', 'percentile'],
        default: 'zscore'
    },

    useNormalization: Boolean,
    targetMean: Number,
    targetStdDev: Number,

    grades: Array,           // for z-score
    percentileBands: Array   // for percentile
});

module.exports = mongoose.model('rconfigmodel', schema);