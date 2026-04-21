const mongoose = require('mongoose');

const pologdsschema = new mongoose.Schema({
    poid: {
        type: String,
        required: true,
        index: true
    },
    po_object_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'storepoorderds2',
        required: true
    },
    action: {
        type: String,
        enum: ['Created', 'Submitted', 'EditRequested', 'EditApproved', 'EditRejected', 'Modified', 'Approved', 'Rejected'],
        required: true
    },
    user: {
        type: String,   // Email or UUID
        required: true
    },
    userName: {
        type: String
    },
    colid: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String
    },
    // For storing exact quantity modifications
    changes: [{
        itemId: String,
        itemname: String,
        originalQty: Number,
        revisedQty: Number
    }]
});

const pologds2 = mongoose.model('pologds2', pologdsschema);

module.exports = pologds2;
