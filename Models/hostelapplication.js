const mongoose = require("mongoose");

const hostelapplicationschema = new mongoose.Schema({
    regno: {type: String},
    year: {type: String},
    student: {type: String},
    roomname: {type: String},
    buildingname: {type: String},
    bedno: {type: Number},
    appstatus:{type: String, enum:["Approved", "Pending", "Rejected"], default: "Pending"}
})

const hostelapplication = mongoose.model("hostelapplication", hostelapplicationschema);

module.exports = hostelapplication;