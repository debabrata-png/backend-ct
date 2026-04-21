const mongoose = require('mongoose');

const requisastiondsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },

    faculty: { type: String },
    facultyid: { type: String },
    itemcode: { type: String },
    itemname: { type: String },
    quantity: { type: Number },
    reqdate: { type: Date },
    allotted: { type: Number },
    allotdate: { type: Date },
    poid: { type: String },
    storeid: { type: String },
    storename: { type: String },
    reqstatus: { type: String },
    year: { type: String }
});

const requisationds2 = mongoose.model('requisitionds2', requisastiondsschema);
module.exports = requisationds2;