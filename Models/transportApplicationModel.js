// import { Schema, model } from "mongoose";

// const transportApplicationSchema = new Schema(
//   {
//     colId: { type: String, required: true },
//     academicSession: { type: String, required: true }, 

//     studentName: { type: String, required: true },
//     classAndSection: { type: String, required: true },
//     admissionNo: { type: String },
//     fatherName: { type: String },

//     address: { type: String },
//     mobileRes: { type: String },
//     mobileOffice: { type: String },

//     transportRequired: { type: String, enum: ["YES", "NO"], required: true },
//     boardingPoint: { type: String },

//     busNo: { type: String },
//     transportCharges: { type: String },

//     parentSignatureName: { type: String },
//     relationshipWithStudent: { type: String },

//     status: { type: String, default: "SUBMITTED" }, // SUBMITTED / APPROVED / REJECTED
//     createdByRole: { type: String, enum: ["STUDENT", "Admin"] }
//   },
//   { timestamps: true }
// );

// export default model("TransportApplication", transportApplicationSchema);
