const mongoose=require('mongoose');

const paucrsedetailsschema = new mongoose.Schema({
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
    degree: {
type: String
},
course: {
type: String
},
sancintake: {
type: Number
},
admtintake: {
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
const paucrsedetails=mongoose.model('paucrsedetails',paucrsedetailsschema);

module.exports=paucrsedetails;

