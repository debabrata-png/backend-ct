const mongoose = require("mongoose");

const budgetpodsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    budgetname: { type: String },
    year: { type: String },
    department: { type: String },
    amount: { type: Number },
    budgettype: { type: String },
    approvedby: [{
        approvername: { type: String },
        levelofapproval: { type: String },
        status: { type: String },
        date: { type: Date }
    }],
    finallevel: { type: String },
    status: { type: String },
    remarks: { type: String }
})

const budgetpods = mongoose.model("budgetpods", budgetpodsschema);
module.exports = budgetpods;