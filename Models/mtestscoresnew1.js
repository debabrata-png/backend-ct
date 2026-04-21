const mongoose=require('mongoose');

const mtestscoresnew1schema = new mongoose.Schema({
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
examdate: {
type: Date
},
testid: {
type: String
},
test: {
type: String
},
sessionid: {
type: String
},
session: {
type: String
},
sectionid: {
type: String
},
section: {
type: String
},
questionid: {
type: String
},
question: {
type: String
},
option: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
score: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const mtestscoresnew1=mongoose.model('mtestscoresnew1',mtestscoresnew1schema);

module.exports=mtestscoresnew1;

