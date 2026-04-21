const mongoose = require('mongoose');

const headTypeMasterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    colid: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const headtypemasterds2 = mongoose.model('headtypemasterds2', headTypeMasterSchema);

module.exports = headtypemasterds2;
