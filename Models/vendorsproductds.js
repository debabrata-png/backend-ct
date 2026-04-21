const mongoose = require('mongoose');

const vendorproductschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    vendorname: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    gst: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    finalprice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const vendorproductds = mongoose.model("vendorproductds", vendorproductschema);

module.exports = vendorproductds;