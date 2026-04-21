const mongoose = require("mongoose");

const lawuserdsschema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    colid: { type: String, required: true },
});

const lawuserds = mongoose.model("lawuserds", lawuserdsschema);
module.exports = lawuserds;