const mongoose=require('mongoose');

const nufacultydataschema = new mongoose.Schema({
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
sancfacultystrength: {
type: Number
},
appointedfacultystrength: {
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
const nufacultydata=mongoose.model('nufacultydata',nufacultydataschema);

module.exports=nufacultydata;

