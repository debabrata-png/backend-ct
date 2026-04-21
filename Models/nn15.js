const mongoose=require('mongoose');

const nn15schema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
year: {
type: String
},
mooc: {
type: String
},
moocp: {
type: String
},
moocper: {
type: Number
},
moocno: {
type: Number
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
const nn15=mongoose.model('nn15',nn15schema);

module.exports=nn15;

