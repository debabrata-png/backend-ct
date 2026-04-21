const mongoose = require("mongoose");

const topiccategoryds1schema = new mongoose.Schema({
    name: { type: String, required: true },
    user: {type: String, required: true},
    colid: {type: Number, required: true},
    categoryname: { type: String },
});

const topiccategoryds1 = mongoose.model("topiccategoryds1", topiccategoryds1schema);

module.exports = topiccategoryds1;