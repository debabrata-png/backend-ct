// Models/breakoutassignmentds.js
const mongoose = require('mongoose');

const breakoutassignmentschema = new mongoose.Schema({
    roomid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classbreakoutroomds',
        required: true
    },
    studentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'classenr1',
        required: true
    },
    studentregno: {
        type: String,
        required: true
    },
    studentname: {
        type: String,
        required: true
    },
    studentphoto: {
        type: String,
        default: ''
    },
    studentemail: {
        type: String,
        required: true
    },
    assignedby: {
        type: String,
        required: true
    },
    colid: {
        type: Number}
}, {
    timestamps: true,
    versionKey: false
});

const breakoutassignmentds = mongoose.model('breakoutassignmentds', breakoutassignmentschema);
module.exports = breakoutassignmentds;
