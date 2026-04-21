const mongoose=require('mongoose');

const nn781schema = new mongoose.Schema({
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
party: {
type: String
},
agenda: {
type: String
},
activity: {
type: String
},
moudate: {
type: Date
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
const nn781=mongoose.model('nn781',nn781schema);

module.exports=nn781;

