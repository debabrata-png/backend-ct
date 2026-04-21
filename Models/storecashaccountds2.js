const mongoose = require('mongoose');

const storecashaccountdsschema = new mongoose.Schema({
    storeid: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    approvalThreshold: {
        type: Number,
        default: 5000
    },
    balance: {
        type: Number,
        default: 0
    },
    allocatedBy: {
        type: String,
        required: true
    },
    lastRefillDate: {
        type: Date,
        default: Date.now
    },
    transactions: [{
        amount: Number,
        type: { type: String, enum: ['CREDIT', 'DEBIT'] }, // Credit = refill, Debit = utilization
        poid: { type: String },
        remarks: { type: String },
        date: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const storecashaccountds2 = mongoose.model('storecashaccountds2', storecashaccountdsschema);

module.exports = storecashaccountds2;
