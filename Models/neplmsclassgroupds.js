const mongoose = require("mongoose");

const nepLmsClassGroupSchema = new mongoose.Schema(
  {
    groupname: { type: String, trim: true, required: true },
    academicyear: { type: String, trim: true, required: true },
    regulation: { type: String, trim: true },
    program: { type: String, trim: true },
    programcode: { type: String, trim: true, required: true },
    type: { type: String, trim: true },
    subject: { type: String, trim: true },
    semester: { type: String, trim: true, required: true },
    course: { type: String, trim: true, required: true },
    coursecode: { type: String, trim: true, required: true },
    facultyname: { type: String, trim: true },
    facultyemail: { type: String, trim: true, required: true },
    studentid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    student: { type: String, trim: true, required: true },
    studentemail: { type: String, trim: true },
    studentphone: { type: String, trim: true },
    regno: { type: String, trim: true },
    section: { type: String, trim: true },
    category: { type: String, trim: true },
    gender: { type: String, trim: true },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

nepLmsClassGroupSchema.index({
  colid: 1,
  academicyear: 1,
  regulation: 1,
  programcode: 1,
  semester: 1,
  coursecode: 1,
  facultyemail: 1,
  groupname: 1,
  regno: 1
}, { unique: true, sparse: true });

module.exports = mongoose.model("neplmsclassgroupds", nepLmsClassGroupSchema);
