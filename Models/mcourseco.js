const mongoose=require('mongoose');

const mcoursecoschema = new mongoose.Schema({
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
cocode: {
type: String
},
co: {
type: String
},
type: {
type: String
},
targetlevel: {
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
const mcourseco=mongoose.model('mcourseco',mcoursecoschema);

module.exports=mcourseco;

