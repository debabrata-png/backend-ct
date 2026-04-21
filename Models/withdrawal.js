const { Schema, model } = require("mongoose");

const withdrawalSchema = new Schema(
  {
    // Common Fields
    colid: { type: String, required: true },
    applicationId: { type: Schema.Types.ObjectId, required: true },
    applicationType: { 
      type: String, 
      enum: ["ADMISSION", "BUS"], 
      required: true 
    },
    
    // Student Details
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    classAndSection: { type: String },
    admissionNo: { type: String },
    
    // Parent/Guardian Details
    fatherOrGuardianName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    
    // Withdrawal Details
    withdrawalReason: { type: String, required: true },
    withdrawalDate: { type: Date, required: true },
    
    // For Bus Withdrawal only
    busNumber: { type: String },
    routeDetails: { type: String },
    
    // Signatures
    parentSignatureUrl: { type: String },
    
    // Status
    status: {
      type: String,
      enum: ["SUBMITTED", "APPROVED", "REJECTED"],
      default: "SUBMITTED",
    },
    
    // Admin Actions
    approvedBy: { type: String },
    approvedAt: { type: Date },
    adminRemarks: { type: String },
    
    // Role
    submittedBy: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Withdrawal", withdrawalSchema);
