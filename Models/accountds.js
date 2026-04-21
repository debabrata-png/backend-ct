const mongoose = require("mongoose");

const accountdsschema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    account: {type: String, required: true},
    description: {type: String},
    acctype: {type: String, enum:["Asset", "Liability", "Income","Expenditure","Capital"]},
    accountgroup:{type: String}
})

const accountds = mongoose.model("accountds", accountdsschema);
module.exports = accountds;

