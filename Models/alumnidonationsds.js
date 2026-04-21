const mongoose = require('mongoose');

const alumniDonationSchema = new mongoose.Schema({
    colid: { type: Number, required: true },
    alumniId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    
    // Common fields
    donationType: { type: String, enum: ['Monetary', 'Kind'], required: true },
    
    // Monetary donation fields
    amount: { type: Number },
    purpose: { type: String },
    paymentMethod: { type: String },
    transactionId: { type: String },
    paymentStatus: { type: Number, default: 0 }, // 0: Pending, 1: Completed, 2: Failed
    
    // Kind (Material) donation fields
    itemName: { type: String },
    itemDescription: { type: String },
    quantity: { type: Number },
    estimatedValue: { type: Number },
    deliveryMethod: { type: String },
    deliveryStatus: { type: Number, default: 0 }, // 0: Pending, 1: Delivered, 2: Rejected
    
    // Admin approval
    adminStatus: { type: Number, default: 0 }, // 0: Pending, 1: Approved, 2: Rejected
    approvalDate: { type: Date },
    rejectionReason: { type: String },
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AlumniDonations', alumniDonationSchema);
