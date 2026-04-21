const mongoose = require('mongoose');

const OutcomeagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    outcomename: { type: String },
    description: { type: String },
    isactive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Outcomeag', OutcomeagSchema);
