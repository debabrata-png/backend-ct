const mongoose=require('mongoose');

const wcolscheduleschema = new mongoose.Schema({
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
ctime: {
type: String
},
vendor: {
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
const wcolschedule=mongoose.model('wcolschedule',wcolscheduleschema);

module.exports=wcolschedule;

