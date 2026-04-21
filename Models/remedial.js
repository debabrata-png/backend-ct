const mongoose=require('mongoose');

const remedialschema = new mongoose.Schema({
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
    intervention: {
        type: String
    },
    student: {
        type: String
    },
    regno: {
        type: String
    },
    academicyear: {
        type: String
    },
    remdate: {
        type: Date
    },
    department: {
        type: String
    },
    program: {
        type: String
    },
    programcode: {
        type: String
    },
    course: {
        type: String
    },
    coursecode: {
        type: String
    },
    type: {
        type: String
    },
    comments: {
        type: String
    },
    status1: {
        type: String
    }
})
//
const Remedial=mongoose.model('Remedial',remedialschema);

module.exports=Remedial;

