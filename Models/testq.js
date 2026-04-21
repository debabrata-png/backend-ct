const mongoose=require('mongoose');

const testqschema = new mongoose.Schema({
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
    testid: {
type: String
},
question: {
type: String
},
type: {
type: String
},
imagelink: {
type: String
},
videolink: {
type: String
},
doclink: {
type: String
},
co: {
type: String
},
po: {
type: String
},
module: {
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
const testq=mongoose.model('testq',testqschema);

module.exports=testq;

