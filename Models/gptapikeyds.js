const mongoose = require('mongoose');

// API Key schema
const apikeydsschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    user: {
        type: String,
        required: [true, 'Please enter user'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true, 'Please enter colid']
    },
    facultyid: {
        type: String,
        required: [true, 'Please enter faculty id']
    },
    defaultapikey: {
        type: String,
        required: [true, 'Please enter default API key']
    },
    personalapikey: {
        type: String,
        default: ''
    },
    usepersonalkey: {
        type: Boolean,
        default: false
    },
    apikeyname: {
        type: String,
        default: 'Default College Key'
    },
    personalapikeyname: {
        type: String,
        default: 'Personal Key'
    },
    monthlylimit: {
        type: Number,
        default: 1000 // tokens limit per month
    },
    currentusage: {
        type: Number,
        default: 0
    },
    lastusagedate: {
        type: Date,
        default: Date.now
    },
    isactive: {
        type: Boolean,
        default: true
    },
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    },
    youtubeapikey: {
    type: String,
    default: ''
  },
  youtubequotaused: {
    type: Number,
    default: 0
  },
  youtubequotalimit: {
    type: Number,
    default: 10000 // Daily quota limit
  },
  youtubelastusage: {
    type: Date,
    default: Date.now
  }
});

// Index for querying by colid
apikeydsschema.index({ colid: 1 });

const gptapikeyds = mongoose.model('gptapikeyds', apikeydsschema);
module.exports = gptapikeyds;
