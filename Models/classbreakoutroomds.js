// Models/classbreakoutmoomds.js
const mongoose = require('mongoose');

const breakoutroomschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter room name']
    },
    classid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classnew',
        required: true
    },
    user: {
        type: String,
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    coursecode: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    maxparticipants: {
        type: Number,
        default: 6
    },
    assignmentlinks: [{
        title: String,
        url: String,
        description: String,
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    documentLinks: [{
        title: String,
        url: String,
        description: String,
        fileType: String,
        addedat: {
            type: Date,
            default: Date.now
        }
    }],
    isactive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
    versionKey: false
});

const classbreakoutroomds = mongoose.model('classbreakoutroomds', breakoutroomschema);
module.exports = classbreakoutroomds;
