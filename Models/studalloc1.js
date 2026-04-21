const mongoose = require('mongoose');

const StudAllocSchema = new mongoose.Schema({
student: { type: String, required: true },
regno: { type: String },
examode: { type: String },
program: { type: String },
courseCode: { type: String },
course: { type: String },
link: { type: String },
status: { type: String },
status1: { type: String },
comments: { type: String },
checkstatus: { type: String },
component: { type: String },
marks: { type: Number },
weightage: { type: Number },
semester: { type: String },
name: { type: String },
user: { type: String },
year: { type: String },
colid: { type: Number },
checkeddate: { type: Date },
faculty: { type: String, default: '' },
facultyid: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('studalloc1', StudAllocSchema);