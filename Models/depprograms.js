const mongoose=require('mongoose');

const depprogramsschema = new mongoose.Schema({
    user: {
        type: String,
        required: [true,'Please enter email'],
        unique: false
    },
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    department: {
        type: String,
        required: [true,'Please enter department']
    },
    program: {
        type: String,
        required: [true,'Please enter program']
    },
    programcode: {
        type: String,
        required: [true,'Please enter programcode']
    },
    level: {
        type: String
    },
    faculty: {
        type: String
    },
    introduced: {
        type: Date
    },
    discontinued: {
        type: Date
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Depprograms=mongoose.model('Depprograms',depprogramsschema);

module.exports=Depprograms;

