const mongoose = require('mongoose');

const deductionschema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    deductionName: {
        type: String,
        required: true
    },
    deductionAmount: {
        type: Number,
        required: true
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
});

module.exports = mongoose.model('Deduction', deductionschema);
