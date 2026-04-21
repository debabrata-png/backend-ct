const mongoose=require('mongoose');

const ppucoursesschema = new mongoose.Schema({
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
    degree: {
type: String
},
progname: {
type: String
},
sancstrngth: {
type: Number
},
studonroll: {
type: Number
},
startdate: {
type: Date
},
affil: {
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
const ppucourses=mongoose.model('ppucourses',ppucoursesschema);

module.exports=ppucourses;

