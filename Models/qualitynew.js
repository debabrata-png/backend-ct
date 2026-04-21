const mongoose=require('mongoose');

const qualitynewschema = new mongoose.Schema({
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
type: {
type: String
},
action: {
type: String
},
instname: {
type: String
},
activity: {
type: String
},
startdate: {
type: Date
},
enddate: {
type: Date
},
partstatus: {
type: String
},
other: {
type: String
},
meetings: {
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
const qualitynew=mongoose.model('qualitynew',qualitynewschema);

module.exports=qualitynew;

