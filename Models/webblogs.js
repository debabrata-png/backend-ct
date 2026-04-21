const mongoose = require("mongoose");

const webblogsSchema = new mongoose.Schema({

    colid: {
        type: Number,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    shortdesc: {
        type: String
    },

    content: {
        type: String
    },

    image: {
        type: String
    },

    createdon: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("webblogs", webblogsSchema);