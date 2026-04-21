const mongoose=require('mongoose');

const bmouschema = new mongoose.Schema({
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
purpose: {
type: String
},
bodyname: {
type: String
},
bodytype: {
type: String
},
address: {
type: String
},
signdate: {
type: Date
},
duration: {
type: String
},
activity: {
type: String
},
link: {
type: String
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
const bmou=mongoose.model('bmou',bmouschema);

module.exports=bmou;

