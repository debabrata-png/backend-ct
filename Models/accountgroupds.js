const mongoose = require("mongoose");

const accountGroupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    groupname: {type: String, required: true},
    grouptype: {type: String, enum:["Asset", "Liability", "Income","Expenditure","Capital"]}
});

const accountgroupds = mongoose.model("accountgroupds", accountGroupSchema);

module.exports = accountgroupds;
