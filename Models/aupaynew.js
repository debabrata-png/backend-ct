const mongoose=require('mongoose');

const aupaynewschema = new mongoose.Schema({
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
    collegecode: {
type: String
},
type: {
type: String
},
amount: {
type: Number
},
paydate: {
type: Date
},
payref: {
type: String
},
paytype: {
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
const aupaynew=mongoose.model('aupaynew',aupaynewschema);

module.exports=aupaynew;

