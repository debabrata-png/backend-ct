const mongoose=require('mongoose');

const mvacschema = new mongoose.Schema({
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
course: {
type: String
},
coursecode: {
type: String
},
startdate: {
type: Date
},
enddate: {
type: String
},
duration: {
type: Number
},
studenroll: {
type: Number
},
studcomplete: {
type: Number
},
type: {
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
const mvac=mongoose.model('mvac',mvacschema);

module.exports=mvac;

