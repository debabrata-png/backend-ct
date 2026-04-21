const mongoose=require('mongoose');

const assignsubmitschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter regno'],
        unique: false
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link'],
        unique: false
    },
    classdate: {
        type: Date
    },
    assignmentid: {
        type: String,
        required: [true,'Please enter assignmentid'],
        unique: false
    },
    assignment: {
        type: String,
        required: [true,'Please enter assignment'],
        unique: false
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
const Assignsubmit=mongoose.model('Assignsubmit',assignsubmitschema);

module.exports=Assignsubmit;

