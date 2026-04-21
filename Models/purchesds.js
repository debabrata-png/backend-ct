const mongoose = require('mongoose');

const purchesdschema = new mongoose.Schema({
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
    vendorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendords",
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
    quantity: {
        type: Number,
        required: true
    },
        price: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    gst: {
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
    },
    status: {
        type: String
    }
});

const purchesds = mongoose.model("purchesds", purchesdschema);

module.exports = purchesds;
