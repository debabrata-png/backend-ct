const mongoose = require("mongoose");

const keiquestionSchema = new mongoose.Schema({

    colid: {
        type: Number
    },

    category: {
        type: String,
        required: true
    },

    expectation: {
        type: String,
        required: true
    },

     role: {
        type: String
    },

    year: {
        type: String
    },

    name: {
        type: String
    },

    user: {
        type: String
    },

    active: {
        type: Boolean,
        default: true
    }

});

keiquestionSchema.index({ colid:1 });

module.exports = mongoose.model(
    "keiquestion2",
    keiquestionSchema
);