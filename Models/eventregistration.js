const mongoose = require("mongoose");

const eventregschema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    eventname: {type: String},
    eventid: {type: mongoose.Schema.Types.ObjectId, ref: 'eventsnew1', required: true},
    institutionname: {type: String},
    designation: {type: String},
    topic: {type: String},
    speakerprofile: {type: String},
    phone: {type: String},
    day: {type: String},
    date: {type: Date},
    time: {type: String},
    role: {type: String},
    status1: {type: String, enum:["Pending", "Approved", "Rejected"], default: "Pending"},
    colid: {type: Number},
})

const eventregistration = mongoose.model("eventregistration1", eventregschema);
module.exports = eventregistration;