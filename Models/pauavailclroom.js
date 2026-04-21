const mongoose=require('mongoose');

const pauavailclroomschema = new mongoose.Schema({
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
    name: {
type: String
},
area: {
type: Number
},
noofroom: {
type: Number
},
latitude: {
type: String
},
longitude: {
type: String
},
type: {
type: String
},
capacity: {
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
const pauavailclroom=mongoose.model('pauavailclroom',pauavailclroomschema);

module.exports=pauavailclroom;

