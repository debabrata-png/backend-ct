// import { Schema, model } from "mongoose";

// const busWithdrawalSchema = new Schema(
//   {
//     colId: { type: String, required: true },

//     academicYear: { type: String, required: true },

//     studentName: { type: String, required: true },
//     className: { type: String, required: true },
//     section: { type: String, required: true },

//     fatherOrGuardianName: { type: String, required: true },
//     contactNumber: { type: String, required: true },

//     residenceAddress: { type: String, required: true },

//     busNumber: { type: String, required: true },
//     withdrawalFromDate: { type: Date, required: true },

//     parentSignatureUrl: { type: String, required: true },

//     status: {
//       type: String,
//       enum: ["SUBMITTED", "APPROVED", "REJECTED"],
//       default: "SUBMITTED",
//     },

//     approvedFromDate: { type: Date },

//     transportInchargeSignatureUrl: { type: String },
//     principalSignatureUrl: { type: String },

//     submittedBy: { type: String, required: true },  
//   },
//   { timestamps: true }
// );

// export default model("BusWithdrawalApplication", busWithdrawalSchema);
