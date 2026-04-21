const mongoose = require('mongoose');

const exAgentSchema = new mongoose.Schema({
    name: String,
    colid: Number,

    toysPerHour: Number,
    productivity: Number,

    monthlyCost: Number
});

module.exports = mongoose.model('exAgent', exAgentSchema);