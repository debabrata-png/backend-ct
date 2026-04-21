const mongoose = require('mongoose');

const deliverytypedsschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter delivery type name']
    },
    user: {
        type: String,
        required: [true, 'Please enter user']
    },
    colid: {
        type: Number,
        required: [true, 'Please enter colid']
    },
    description: {
        type: String
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const deliverytypeds2 = mongoose.model('deliverytypeds2', deliverytypedsschema);
module.exports = deliverytypeds2;
