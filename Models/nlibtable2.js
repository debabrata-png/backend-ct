const mongoose=require('mongoose');

const nlibtable2schema = new mongoose.Schema({
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
noOfTitles: {
type: Number
},
noOfBooks: {
type: Number
},
noOfBooksForRef: {
type: Number
},
noOfEbooks: {
type: Number
},
noOfJournals: {
type: Number
},
place: {
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
const nlibtable2=mongoose.model('nlibtable2',nlibtable2schema);

module.exports=nlibtable2;

