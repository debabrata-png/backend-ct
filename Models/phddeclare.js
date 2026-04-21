const mongoose=require('mongoose');

const phddeclareschema = new mongoose.Schema({
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
    faculty: {
type: String
},
phdyear: {
type: String
},
university: {
type: String
},
subject: {
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
const phddeclare=mongoose.model('phddeclare',phddeclareschema);

module.exports=phddeclare;

