const mongoose = require('mongoose');

const filemovementschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    fileid: { type: String },
    file: { type: String },
    department: { type: String },
    activity: { type: String },
    faculty: { type: String },
    facultyid: { type: String },
    activitydate: { type: Date }
}, {
    timestamps: true
})

const filemovementds = mongoose.model('filemovementds', filemovementschema);

module.exports = filemovementds;
