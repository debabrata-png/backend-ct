const mongoose = require('mongoose');

const storeuserdsschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    colid: {
        type: Number,
        required: true
    },
    storeuser: {
        type: String
    },
    storeid: {
        type: String
    },
    store: {
        type: String
    },
    userid: {
        type: String
    },
    level: {
        type: String
    }
})

const storeuserds2 = mongoose.model('storeuserds2', storeuserdsschema);

module.exports = storeuserds2;