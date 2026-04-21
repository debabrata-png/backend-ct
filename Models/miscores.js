const mongoose=require('mongoose');

const miscoresschema = new mongoose.Schema({
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
username: {
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
const miscores=mongoose.model('miscores',miscoresschema);

module.exports=miscores;

