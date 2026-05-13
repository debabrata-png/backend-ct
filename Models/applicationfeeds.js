const mongoose = require("mongoose");

const applicationFeeSchema = new mongoose.Schema(
  {
    academicyear: {
      type: String,
      required: [true, "Please enter academic year"]
    },
    program: {
      type: String,
      required: [true, "Please enter program"]
    },
    programcode: {
      type: String,
      required: [true, "Please enter program code"]
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount"]
    },
    active: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes"
    },
    user: {
      type: String
    },
    colid: {
      type: Number,
      required: [true, "Please enter colid"]
    }
  },
  { timestamps: true }
);

applicationFeeSchema.index({ colid: 1, academicyear: 1, programcode: 1 });

const ApplicationFee = mongoose.model("ApplicationFee", applicationFeeSchema);

module.exports = ApplicationFee;
