const mongoose=require('mongoose');

const startupschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    startupname: {
        type: String
    },
    description: {
        type: String
    },
    startupdate: {
        type: Date
    },
    programname: {
        type: String
    },
    programcode: {
        type: String
    },
    student: {
        type: String
    },
    regno: {
        type: String
    },
    yop: {
        type: String,
        required: [true,'Please enter year'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const Startup=mongoose.model('Startup',startupschema);

module.exports=Startup;

