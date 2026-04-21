const mongoose=require('mongoose');

const doc242faclistschema = new mongoose.Schema({
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
type: String
},
faculty: {
type: String
},
degree: {
type: String
},
university: {
type: String
},
subject: {
type: String
},
awardyear: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const doc242faclist=mongoose.model('doc242faclist',doc242faclistschema);

module.exports=doc242faclist;

