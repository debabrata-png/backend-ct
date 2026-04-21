const mongoose = require('mongoose');

const vendordsschema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },

    vendorname: { type: String },
    pan: { type: String },
    gst: { type: String },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    mobileno: { type: String },
    email: { type: String },
    type: { type: String },
    payterm: { type: String },
    doclink: { type: String },

    createdAt: { type: Date, default: Date.now }
});

const vendords = mongoose.model('vendords', vendordsschema);
module.exports = vendords;