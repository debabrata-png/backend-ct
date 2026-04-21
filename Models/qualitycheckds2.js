const mongoose = require('mongoose');

const qualitycheckdsschema = new mongoose.Schema({
    inspectionId: { type: String, required: true },
    colid: { type: Number, required: true },

    // Links
    poid: { type: String, required: true },
    grnNo: { type: String, required: true },      // NEW — required, links to grnds2
    grnDate: { type: Date },                       // filled from GRN
    gatePassNumber: { type: String },              // carried through from GRN

    // Inspector
    inspectorName: { type: String, required: true },
    inspectionDate: { type: Date, default: Date.now },

    // Document references (fillable by QC inspector)
    billNo: { type: String },
    billDate: { type: Date },
    challanNo: { type: String },
    challanDate: { type: Date },
    woPoNo: { type: String },                      // W.O / P.O number
    partyName: { type: String },                   // from PO / GRN

    // Financials
    invoiceAmount: { type: Number },
    advanceDeduction: { type: Number, default: 0 },
    paymentDetails: { type: String },              // free-text payment notes
    netPayableAmount: { type: Number },

    // Items
    items: [{
        itemid: String,
        itemname: String,
        unit: String,
        expectedQuantity: Number,   // from PO
        deliveredQuantity: Number,  // from Gate Pass
        grnQuantity: Number,        // confirmed by store
        acceptedQuantity: Number,   // passed QC
        rejectedQuantity: Number,   // failed QC
        remarks: String
    }],

    // Overall status
    status: {
        type: String,
        enum: ['Accepted', 'Partially Rejected', 'Fully Rejected'],
        required: true
    },

    // Signatures (store name of signer, front end shows signature line)
    corporateDirectorName: { type: String },
    executiveName: { type: String },

    approvaltoken: { type: String, required: false, unique: false }
});

const qualitycheckds2 = mongoose.model('qualitycheckds2', qualitycheckdsschema);

module.exports = qualitycheckds2;
