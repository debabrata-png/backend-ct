const mongoose=require('mongoose');

const vacnew1schema = new mongoose.Schema({
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
    course: {
type: String
},
coursecode: {
type: String
},
year: {
type: String
},
period: {
type: String
},
duration: {
type: String
},
enrolled: {
type: Number
},
completed: {
type: Number
},
startdate: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const vacnew1=mongoose.model('vacnew1',vacnew1schema);

module.exports=vacnew1;

