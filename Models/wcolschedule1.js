const mongoose=require('mongoose');

const wcolschedule1schema = new mongoose.Schema({
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
    location: {
type: String
},
binid: {
type: String
},
type: {
type: String
},
cday: {
type: String
},
ctime: {
type: String
},
vendor: {
type: String
},
amount: {
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
const wcolschedule1=mongoose.model('wcolschedule1',wcolschedule1schema);

module.exports=wcolschedule1;

