const mongoose = require("mongoose");

const webeventSchema = new mongoose.Schema({

    colid: {
        type: Number,
        required: true
    },

    title: String,
    description: String,
    eventdate: String,
    eventtime: String,
    location: String,
    eventday: String,
    eventmonth: String,
    link: String

});

module.exports = mongoose.model("webevents", webeventSchema);