const mongoose = require("mongoose");

const budgetpocatdsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    year: { type: String },
    budgetname: { type: String },
    budgetid: { type: mongoose.Types.ObjectId, ref: "budgetpods" },
    department: { type: String },
    category: { type: String },
    amount: { type: Number },
    budgettype: { type: String },
    status: { type: String },
    remarks: { type: String }
})

const budgetpocatds = mongoose.model("budgetpocatds", budgetpocatdsschema);
module.exports = budgetpocatds;