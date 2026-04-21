const mongoose=require('mongoose');

const nn76schema = new mongoose.Schema({
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
quarter: {
type: String
},
participants: {
type: String
},
activity: {
type: String
},
actdate: {
type: Date
},
agenda: {
type: String
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
const nn76=mongoose.model('nn76',nn76schema);

module.exports=nn76;

