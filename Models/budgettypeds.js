const mongoose = require("mongoose");

const budgettypedsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    budgettypename: { type: String },
    isactive: { type: Boolean },
    remarks: { type: String }
})

const budgettypeds = mongoose.model("budgettypeds", budgettypedsschema);
module.exports = budgettypeds;