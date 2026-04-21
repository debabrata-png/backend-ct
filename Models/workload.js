const mongoose=require('mongoose');

const workloadschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    year: {
        type: String
    },
    coursecode: {
        type: String,
        required: [true,'Please enter coursecode'],
        unique: false
    },
    semester: {
        type: String,
        required: [true,'Please enter semester'],
        unique: false
    },
    section: {
        type: String,
        required: [true,'Please enter section'],
        unique: false
    },
    course: {
        type: String,
        required: [true,'Please enter course'],
        unique: false
    },
    program: {
        type: String,
        required: [true,'Please enter program'],
        unique: false
    },
    programcode: {
        type: String
    },
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    module: {
        type: String,
        required: [true,'Please enter module'],
        unique: false
    },
    hours: {
        type: Number,
        required: [true,'Please enter hours']
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
    },
    status: {
        type: Number,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Workload=mongoose.model('Workload',workloadschema);

module.exports=Workload;

