const mongoose = require('mongoose');

const pimprestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    imprestcode: { type: String },
    amount: { type: Number },
    impdate: { type: Date },
    status: { type: String },
    officername: { type: String }
})

const pimprestds2 = mongoose.model('pimprestds2', pimprestSchema);
module.exports = pimprestds2;
