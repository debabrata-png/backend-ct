const mongoose = require('mongoose');

const deleverydsschema = new mongoose.Schema({
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
    poid: {
        type: String
    },
    po: {
        type: String
    },
    item: {
        type: String
    },
    itemcode: {
        type: String
    },
    delivered: {
        type: String
    },
    deldate: {
        type: Date,
        default: Date.now
    },
    accepted: {
        type: String
    },
    return: {
        type: String
    },
    doclink: {
        type: String
    }
})

const deliveryds = mongoose.model('deliveryds2', deleverydsschema);
module.exports = deliveryds;