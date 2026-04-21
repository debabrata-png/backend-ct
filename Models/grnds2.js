const mongoose = require('mongoose');

const grndsschema = new mongoose.Schema({
    grnNo: { type: String, required: true, unique: true },
    gatePassNumber: { type: String, required: true, index: true },
    poid: { type: String, required: true, index: true },
    colid: { type: Number, required: true },
    vendorName: { type: String },
    vendorAddress: { type: String },
    partyName: { type: String },         // same as vendor, used in QC format
    storeId: { type: String },
    storeName: { type: String },
    receivedBy: { type: String },         // Store Incharge name from global1
    grnDate: { type: Date, default: Date.now },
    dcInvoiceNo: { type: String },
    lrNo: { type: String },
    vehicleNo: { type: String },
    billAmount: { type: Number, default: 0 },
    remarks: { type: String },
    status: {
        type: String,
        enum: ['Pending QC', 'QC Done', 'Partially Rejected'],
        default: 'Pending QC'
    },
    items: [{
        itemid: String,
        itemname: String,
        unit: String,
        expectedQuantity: Number,   // from PO
        deliveredQuantity: Number,  // from Gate Pass
        grnQuantity: Number,        // confirmed by store (≤ deliveredQuantity)
        remarks: String
    }],
    user: { type: String },
    name: { type: String, default: 'GRN' }
}, { timestamps: true });

const grnds2 = mongoose.model('grnds2', grndsschema);
module.exports = grnds2;
