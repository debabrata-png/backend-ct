const mongoose = require("mongoose");

const issuebookschema = new mongoose.Schema({
    transactionid: {type: String},
    libraryid: {type: String},
    libraryname: {type: String},
    bookid: {type: String},
    bookname: {type: String},
    regno: {type: String},
    student: {type: String},
    colid: {type: Number},
    issuedate: {type: Date},
    duedate: {type: Date},
    returndate: {type: Date},
    expectedreturndate: {type: Date},
    fineperday: {type: String},
    fineaccrued: {type: String},
    issuestatus: {type: String, enum: ["issued", "returned", "overdue", "lost"], default: "issued"}
})

const issuebookmodel = mongoose.model("IssuedBook", issuebookschema);

module.exports = issuebookmodel;