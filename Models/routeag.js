const mongoose = require("mongoose");

const routeschema = new mongoose.Schema({
    name: {type: String},
    user: {type: String},
    colid: {type: Number},
    routename: {type: String},
    routecode: {type: String, required: true, unique: true},
    pickuppoints: [{type: String}],
    droppoint: {type: String},
}, {timestamps: true})

const routeag = mongoose.model("routeag", routeschema);
module.exports = routeag;