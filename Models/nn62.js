const mongoose=require('mongoose');

const nn62schema = new mongoose.Schema({
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
hackathon: {
type: String
},
activity: {
type: String
},
actdate: {
type: Date
},
participants: {
type: Number
},
location: {
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
const nn62=mongoose.model('nn62',nn62schema);

module.exports=nn62;

