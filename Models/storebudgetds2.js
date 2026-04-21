const mongoose = require('mongoose');

const storebudgetdsschema = new mongoose.Schema({
    headName: {
        type: String,
        required: true
    },
    headType: {
        type: String, // e.g. 'Departmental', 'General'
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    storeid: {
        type: String,
        required: false
    },
    storeName: {
        type: String,
        required: false
    },
    allocatedBudget: {
        type: Number,
        default: 0
    },
    utilizedBudget: {
        type: Number,
        default: 0
    },
    availableBudget: {
        type: Number,
        default: 0
    },
    financialYear: {
        type: String,
        required: true
    },
    allocatedBy: {
        type: String, // email/id of CA or Higher Authority
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const storebudgetds2 = mongoose.model('storebudgetds2', storebudgetdsschema);

module.exports = storebudgetds2;
