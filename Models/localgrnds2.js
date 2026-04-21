const mongoose = require('mongoose');

const localgrnSchema = new mongoose.Schema({
    grnNo: { type: String, required: true },
    lpoId: { type: String, required: true }, // Links to storepoorderds2 poid
    storeid: { type: String, required: true },
    storeName: { type: String, required: true },
    vendorName: { type: String },
    items: [{
        itemname: String,
        quantity: Number,
        unit: String,
        remarks: String
    }],
    grnDate: { type: Date, default: Date.now },
    receivedBy: { type: String, required: true },
    colid: { type: Number, required: true },
    status: { type: String, default: 'Completed' },
    createdAt: { type: Date, default: Date.now }
});

const localgrnds2 = mongoose.model('localgrnds2', localgrnSchema);

module.exports = localgrnds2;
