const mongoose=require('mongoose');

const manouncementsschema = new mongoose.Schema({
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
announcement: {
type: String
},
submitdate: {
type: Date
},
type: {
type: String
},
target: {
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
const manouncements=mongoose.model('manouncements',manouncementsschema);

module.exports=manouncements;

