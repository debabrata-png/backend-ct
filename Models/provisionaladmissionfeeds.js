const mongoose = require("mongoose");

const provisionalAdmissionFeeSchema = new mongoose.Schema(
  {
    academicyear: {
      type: String,
      required: [true, "Please enter academic year"],
      trim: true
    },
    program: {
      type: String,
      required: [true, "Please enter program"],
      trim: true
    },
    programcode: {
      type: String,
      required: [true, "Please enter program code"],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    amount: {
      type: Number,
      default: 0
    },
    user: {
      type: String,
      trim: true
    },
    colid: {
      type: Number,
      required: [true, "Please enter colid"],
      index: true
    }
  },
  { timestamps: true }
);

provisionalAdmissionFeeSchema.index({ colid: 1, academicyear: 1, programcode: 1 });

module.exports = mongoose.model("ProvisionalAdmissionFee", provisionalAdmissionFeeSchema);
