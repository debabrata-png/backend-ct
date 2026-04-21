const mongoose = require("mongoose");

const productrequestdschema = new mongoose.Schema({
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
    productname: {
        type: String,
        required: true
    },
    quantity: {
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

const productrequestds = mongoose.model("productrequestds", productrequestdschema);

module.exports = productrequestds;