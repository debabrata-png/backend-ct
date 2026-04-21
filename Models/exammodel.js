const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    examname: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    program: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
        trim: true
    },
    examdate: {
        type: Date,
        required: true
    },
    subjects: [{
        subjectcode: {
            type: String,
            trim: true
        },
        subjectname: {
            type: String,
            required: true,
            trim: true
        },
    }],
})

const exammodel = mongoose.model("Exammodel", examSchema);
module.exports = exammodel;