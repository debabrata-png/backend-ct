const mongoose=require('mongoose');

const nn22schema = new mongoose.Schema({
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
    faculty: {
type: String
},
designation: {
type: String
},
year: {
type: String
},
sdate: {
type: Date
},
salary: {
type: Number
},
allowance: {
type: Number
},
ugc: {
type: String
},
doclink: {
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
const nn22=mongoose.model('nn22',nn22schema);

module.exports=nn22;

