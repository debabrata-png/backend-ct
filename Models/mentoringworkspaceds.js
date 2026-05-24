const mongoose = require("mongoose");

const mentoringStudentSchema = new mongoose.Schema(
  {
    student: { type: String, trim: true },
    regno: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    academicyear: { type: String, trim: true },
    regulation: { type: String, trim: true },
    program: { type: String, trim: true },
    programcode: { type: String, trim: true },
    semester: { type: String, trim: true },
    section: { type: String, trim: true },
    major: { type: String, trim: true },
    minor: { type: String, trim: true }
  },
  { _id: false }
);

const mentoringWorkspaceSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    groupname: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    facultyname: { type: String, trim: true },
    facultyemail: { type: String, trim: true, index: true },
    academicyear: { type: String, trim: true },
    regulation: { type: String, trim: true },
    program: { type: String, trim: true },
    programcode: { type: String, trim: true },
    semester: { type: String, trim: true },
    section: { type: String, trim: true },
    major: { type: String, trim: true },
    minor: { type: String, trim: true },
    students: { type: [mentoringStudentSchema], default: [] },
    status: { type: String, trim: true, default: "Active" },
    createdby: { type: String, trim: true }
  },
  { timestamps: true }
);

mentoringWorkspaceSchema.index({ colid: 1, facultyemail: 1, groupname: 1 });
mentoringWorkspaceSchema.index({ colid: 1, "students.regno": 1 });

module.exports = mongoose.model("mentoringworkspaceds", mentoringWorkspaceSchema);
