const mongoose = require('mongoose');

const exGameSchema = new mongoose.Schema({
    colid: Number,
    balance: Number,
    totalToys: Number,
    agents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exAgent' }]
});

module.exports = mongoose.model('exGame', exGameSchema);