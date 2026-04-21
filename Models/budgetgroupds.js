const mongoose = require("mongoose");

const budgetgroupdsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    groupname: { type: String },
    category: { type: String },
    budgettype: { type: String },
    status: { type: String },
    remarks: { type: String }
})

const budgetgroupds = mongoose.model("budgetgroupds", budgetgroupdsschema);
module.exports = budgetgroupds;