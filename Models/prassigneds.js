const mongoose = require('mongoose');

const prassignedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true },
    colid: { type: Number, required: true },
    prassigneemail: { type: String },
    prassignename: { type: String },
    storereqid: { type: String },
    storename: { type: String },
    status: { type: String }
}, {
    timestamps: true
})

const prassigneds = mongoose.model('prassigneds', prassignedSchema);

module.exports = prassigneds;
