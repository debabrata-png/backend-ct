const mongoose = require("mongoose");

const cashApprovalSchema = new mongoose.Schema({
    colid: {
        type: Number,
        required: [true, "A Cash Approval must have a colid"],
    },
    user: {
        type: String,
        // required: [true, "A Cash Approval must have a user"],
    },
    name: {
        type: String,
        // required: [true, "A Cash Approval must have a creator name"],
    },
    approvalNo: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    dept: {
        type: String,
    },
    supplierName: {
        type: String,
    },
    subject: {
        type: String,
    },
    items: [
        {
            srNo: Number,
            item: String,
            makeSize: String,
            uom: String,
            qty: Number,
            rate: Number,
            gst: Number,
            taxPaidRate: Number,
            total: Number,
        },
    ],
    totalAmount: {
        type: Number,
    },
    gstAmount: {
        type: Number,
    },
    grandTotal: {
        type: Number,
    },
    amountInWords: {
        type: String,
    },
    termsConditions: {
        type: String,
    },
    priceType: {
        type: String, // e.g., 'Collect From shop'
    },
    delivery: {
        type: String, // e.g., 'YES'
    },
    payment: {
        type: String, // e.g., 'CASH'
    },
    gstIncluded: {
        type: String, // e.g., 'INCL'
    },
    warranty: {
        type: String, // e.g., 'NA'
    },
    jurisdiction: {
        type: String, // e.g., 'BHOPAL COURT ONLY/-'
    },
    verifiedBy: {
        type: String,
    },
    approvedBy: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Approved", "Rejected"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const CashApprovalds2 = mongoose.model("CashApprovalds2", cashApprovalSchema);

module.exports = CashApprovalds2;
