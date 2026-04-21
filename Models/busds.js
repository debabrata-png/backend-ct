const mongoose = require("mongoose");

const busschema = new mongoose.Schema({
    name: {type: String},
    user:{type: String},
    colid: {type: String},
    busname: {type: String},
    busnumber: {type: String, required: true, unique: true},
    noofseat: {type: Number},
    priceperseat:{type: Number},
    drivername: {type: String},
    driveridno: {type: String},
    routeid: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "routeds"},
    routename: {type: String},
    routecode: {type: String}
})

const busds = mongoose.model("busds", busschema);
module.exports = busds;