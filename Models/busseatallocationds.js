const mongoose = require("mongoose");

const busseatallocationschema = new mongoose.Schema({
    name: {type: String},
    user: {type: String},
    colid: {type: Number},
    studentname: {type: String},
    regno: {type: String},
    busid: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "busds"},
    busnumber: {type: String },
    seatno: {type: String}
})

const busseatallocationds = mongoose.model("busseatallocationds", busseatallocationschema);

module.exports = busseatallocationds;