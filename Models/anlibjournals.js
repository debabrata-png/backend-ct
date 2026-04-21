const mongoose=require('mongoose');

const anlibjournalsschema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
natreq: {
type: Number
},
natavail: {
type: Number
},
interreq: {
type: Number
},
interavail: {
type: Number
},
natdef: {
type: Number
},
interdef: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const anlibjournals=mongoose.model('anlibjournals',anlibjournalsschema);

module.exports=anlibjournals;

