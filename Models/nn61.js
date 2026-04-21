const mongoose=require('mongoose');

const nn61schema = new mongoose.Schema({
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
club: {
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
const nn61=mongoose.model('nn61',nn61schema);

module.exports=nn61;

