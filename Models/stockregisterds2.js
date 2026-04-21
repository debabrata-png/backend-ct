const mongoose = require('mongoose');

const stockregisterdsschema = new mongoose.Schema({
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
    store: {
        type: String
    },
    storeid: {
        type: String
    },
    item: {
        type: String
    },
    itemid: {
        type: String
    },
    itemtype: {
        type: String
    },
    quantityadded: {
        type: Number
    },
    quantityreturn: {
        type: Number
    },
    netquantity: {
        type: Number
    },
    tdate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String
    }
});

const stockregisterds2 = mongoose.model('stockregisterds2', stockregisterdsschema);

module.exports = stockregisterds2;