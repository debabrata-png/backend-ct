const { Schema, model } = require("mongoose");

const transportApplicationSchema = new Schema(
  {
    studentEmail: String,
    role: { type: String, required: true },
    colid: { type: String, required: true },
    academicSession: { type: String, required: true },

    studentName: { type: String, required: true },
    admissionNo: String,
    classAndSection: { type: String, required: true },

    fatherName: { type: String, required: true },
    motherName: String,

    address: { type: String, required: true },

    mobileResi: String,
    mobileOffice: String,

    transportRequired: {
      type: String,
      enum: ["YES", "NO"],
      required: true,
    },

    boardingPoint: {
      type: String,
      required: function () {
        return this.transportRequired === "YES";
      },
    },

    selectedRouteId: {
      type: Schema.Types.ObjectId,
      ref: "Route",
    },

    studentPhotoUrl: String,
    parentSignatureUrl: String,
    motherSignatureUrl: String,

    parentName: { type: String, required: true },
    relationWithStudent: {
      type: String,
      enum: ["Father", "Mother", "Guardian"],
      required: true,
    },

    parentAcknowledgement: { type: Boolean, required: true },
    transportRulesAcknowledgement: { type: Boolean, required: true },
    newChargesAcknowledgement: { type: Boolean, required: false },

    dateOfApplication: { type: Date, required: true },

    applicationStatus: {
      type: String,
      default: "SUBMITTED",
      enum: ["SUBMITTED", "APPROVED", "REJECTED", "WITHDRAWN"],
    },

    approvedBy: String,
    approvedAt: Date,
  },
  { timestamps: true }
);

module.exports = model(
  "TransportApplication",
  transportApplicationSchema
);
