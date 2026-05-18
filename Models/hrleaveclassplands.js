const mongoose = require("mongoose");

const hrLeaveClassPlanSchema = new mongoose.Schema(
  {
    leaveapplicationid: { type: mongoose.Schema.Types.ObjectId, ref: "hrleaveapplicationds", index: true },
    timetableid: { type: mongoose.Schema.Types.ObjectId, ref: "neplmstimetableds" },
    academicyear: { type: String, trim: true },
    regulation: { type: String, trim: true },
    program: { type: String, trim: true },
    programcode: { type: String, trim: true },
    major: { type: String, trim: true },
    semester: { type: String, trim: true },
    course: { type: String, trim: true },
    coursecode: { type: String, trim: true },
    classdate: { type: String, trim: true },
    classtime: { type: String, trim: true },
    period: { type: String, trim: true },
    topic: { type: String, trim: true },
    faculty: { type: String, trim: true },
    facultyemail: { type: String, trim: true },
    alternateplan: { type: String, trim: true, required: true },
    status: { type: String, trim: true, default: "Submitted" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

hrLeaveClassPlanSchema.index({ colid: 1, leaveapplicationid: 1 });

module.exports = mongoose.model("hrleaveclassplands", hrLeaveClassPlanSchema);
