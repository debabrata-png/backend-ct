const mongoose = require('mongoose');

const storepoapprovalschema = new mongoose.Schema({
    colid: { type: Number, required: true },
    poid: { type: String, required: true }, // Link to storepoorderds2 _id or poid string
    stepNumber: { type: Number, required: true },
    approverEmail: { type: String, required: true },
    action: { type: String, default: 'Approved' }, // Approved, Rejected
    actionDate: { type: Date, default: Date.now },
    user: { type: String } // Who performed the action
});

const storepoapprovalds2 = mongoose.model('storepoapprovalds2', storepoapprovalschema);
module.exports = storepoapprovalds2;
