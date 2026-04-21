const mongoose=require('mongoose');

const prlistschema = new mongoose.Schema({
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
template: {
type: String
},
templateid: {
type: String
},
category: {
type: String
},
faculty: {
type: String
},
facultyid: {
type: String
},
approveremail: {
type: String
},
level: {
type: Number
},
finalstatus: {
type: String
},
type: {
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
const prlist=mongoose.model('prlist',prlistschema);

module.exports=prlist;

