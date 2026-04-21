const mongoose=require('mongoose');

const amcpdetails3schema = new mongoose.Schema({
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
collegeid: {
type: Number
},
college: {
type: String
},
item: {
type: String
},
compstatus: {
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
const amcpdetails3=mongoose.model('amcpdetails3',amcpdetails3schema);

module.exports=amcpdetails3;

