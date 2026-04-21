const mongoose = require('mongoose');

const prconfigdsSchema = new mongoose.Schema({
    name: { type: String }, // from global1.name
    user: { type: String }, // from global1.user
    colid: { type: String }, // from global1.colid
    institutionname: { type: String },
    address: { type: String },
    phone: { type: String },
    status: { type: String, default: 'Active' },
    prshort: { type: String } // e.g. PRCSPU
});

module.exports = mongoose.model('prconfigds2', prconfigdsSchema);
