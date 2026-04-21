const mongoose=require('mongoose');

const libraryschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    year: {
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    resource: {
        type: String,
        required: [true,'Please enter library resources'],
        unique: false
    },
    details: {
        type: String,
        required: [true,'Please enter details of memberships/subscription'],
        unique: false
    },
    bookexp: {
        type: Number,
        required: [true,'Please enter expenditure on subscription to e-journals/books'],
        unique: false
    },
    
    otherexp: {
        type: Number,
        required: [true,'Please enter expenditure on subscription to other e-resources'],
        unique: false
    },
    totalexp: {
        type: Number,
        required: [true,'Please enter total library expenditure'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link to documents'],
        unique: false
    },

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const LibraryExpenditure=mongoose.model('LibraryExpenditure',libraryschema);

module.exports=LibraryExpenditure;

