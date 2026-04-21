const mongoose=require('mongoose');

const nworkbookschema = new mongoose.Schema({
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
    subject: {
type: String
},
classdetails: {
type: String
},
noofstudents: {
type: Number
},
activitydate: {
type: Date
},
time: {
type: String
},
roomno: {
type: String
},
department: {
type: String
},
dayofweek: {
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
const nworkbook=mongoose.model('nworkbook',nworkbookschema);

module.exports=nworkbook;

