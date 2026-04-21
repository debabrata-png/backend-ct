const mongoose=require('mongoose');

const studawardsnewschema = new mongoose.Schema({
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
event: {
type: String
},
type: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
award: {
type: String
},
amount: {
type: Number
},
doclink: {
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
const studawardsnew=mongoose.model('studawardsnew',studawardsnewschema);

module.exports=studawardsnew;

