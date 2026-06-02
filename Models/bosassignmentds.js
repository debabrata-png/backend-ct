const mongoose = require("mongoose");

const bosAssignmentSchema = new mongoose.Schema(
  {
    academicyear: { type: String, trim: true, required: true },
    regulation: { type: String, trim: true, required: true },
    program: { type: String, trim: true, required: true },
    programcode: { type: String, trim: true, required: true },
    type: { type: String, trim: true, default: "" },
    subject: { type: String, trim: true, default: "" },
    semester: { type: String, trim: true, required: true },
    course: { type: String, trim: true, required: true },
    coursecode: { type: String, trim: true, required: true },
    facultyname: { type: String, trim: true, required: true },
    facultyemail: { type: String, trim: true, required: true },
    status: { type: String, trim: true, default: "Assigned" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

bosAssignmentSchema.index({ colid: 1, academicyear: 1, regulation: 1, programcode: 1, semester: 1, coursecode: 1, facultyemail: 1 });

module.exports = mongoose.model("bosassignmentds", bosAssignmentSchema);
