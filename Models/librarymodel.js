const mongoose = require("mongoose");

const libraryschema = new mongoose.Schema({
    libraryid: {type: String, required: true},
    libraryname: {type: String, required: true},
    libraryincharge: {type: String},
    contactno: {type: String},
    colid: {type: Number}    
});

const librarymodel = mongoose.model("Library", libraryschema);
module.exports = librarymodel;