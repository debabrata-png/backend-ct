const mongoose=require('mongoose');

const nluphdtheisisschema = new mongoose.Schema({
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
scholar: {
type: String
},
theisis: {
type: String
},
facultyname: {
type: String
},
ifphdllm: {
type: String
},
ipr: {
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
const nluphdtheisis=mongoose.model('nluphdtheisis',nluphdtheisisschema);

module.exports=nluphdtheisis;

