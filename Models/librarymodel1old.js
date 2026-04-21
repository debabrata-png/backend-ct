const mongoose = require("mongoose");

const libraryschema = new mongoose.Schema({
    libraryid: {type: String},
    libraryname: {type: String},
    libraryincharge: {type: String},
    contactno: {type: String},
    colid: {type: Number}    
});

const librarymodel = mongoose.model("librarymodel1", libraryschema);
module.exports = librarymodel;