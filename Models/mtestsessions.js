const mongoose=require('mongoose');

const mtestsessionsschema = new mongoose.Schema({
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
    testid: {
type: String
},
session: {
type: String
},
starttime: {
type: Date
},
endtime: {
type: Date
},
type: {
type: String
},
level: {
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
const mtestsessions=mongoose.model('mtestsessions',mtestsessionsschema);

module.exports=mtestsessions;

