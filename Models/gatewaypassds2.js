const mongoose = require('mongoose');

const gatewaypassdsschema = new mongoose.Schema({
    passNumber: {
        type: String,
        required: true
    },
    passType: {
        type: String,
        enum: ['Inward', 'Outdoor'],
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    poid: {
        type: String,
        required: true,
        index: true
    },
    vendorName: {
        type: String
    },
    vendorAddress: {
        type: String
    },
    vehicleNo: {
        type: String,
        required: true
    },
    lrNo: {
        type: String
    },
    deliveryPersonName: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    securityName: {
        type: String, // from global1.name
        required: true
    },
    dcInvoiceNo: {
        type: String,
        required: true
    },
    billAmount: {
        type: Number
    },
    remarks: {
        type: String
    },
    status: {
        type: String,
        enum: ['Open', 'GRN Created'],
        default: 'Open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    items: [{
        itemid: String,
        itemname: String,
        unit: String,
        expectedQuantity: Number,
        deliveredQuantity: Number
    }],
    signatures: {
        soSignature: { type: Boolean, default: false },
        storeInchargeSignature: { type: Boolean, default: false }
    }
});

const gatewaypassds2 = mongoose.model('gatewaypassds2', gatewaypassdsschema);

module.exports = gatewaypassds2;
