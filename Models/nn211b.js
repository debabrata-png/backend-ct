const mongoose=require('mongoose');

const nn211bschema = new mongoose.Schema({
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
    committee: {
type: String
},
comcode: {
type: String
},
year: {
type: String
},
university: {
type: String
},
faculty: {
type: String
},
isphd: {
type: String
},
rdate: {
type: Date
},
designation: {
type: String
},
salary: {
type: Number
},
ugc: {
type: String
},
industryexp: {
type: Number
},
acadexpyears: {
type: Number
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
const nn211b=mongoose.model('nn211b',nn211bschema);

module.exports=nn211b;

