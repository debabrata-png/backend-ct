const mongoose=require('mongoose');

const phdfacschema = new mongoose.Schema({
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
pgyear: {
type: String
},
qualification: {
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
const phdfac=mongoose.model('phdfac',phdfacschema);

module.exports=phdfac;

