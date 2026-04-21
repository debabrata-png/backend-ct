const mongoose=require('mongoose');

const awardsnewschema = new mongoose.Schema({
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
awarddate: {
type: Date
},
awardname: {
type: String
},
type: {
type: String
},
level: {
type: String
},
eventname: {
type: String
},
studentname: {
type: String
},
regno: {
type: String
},
activitytype: {
type: String
},
position: {
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
const awardsnew=mongoose.model('awardsnew',awardsnewschema);

module.exports=awardsnew;

