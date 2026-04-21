const mongoose=require('mongoose');

const lessonplanschema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: String
    },
    department: {
        type: String
    },
    coursecode: {
        type: String
    },
    link: {
        type: String
    },
    semester: {
        type: String
    },
    section: {
        type: String
    },
    classdate: {
        type: Date
    },
    actualdate: {
        type: Date
    },
    course: {
        type: String
    },
    program: {
        type: String
    },
    programcode: {
        type: String
    },
    academicyear: {
        type: String
    },
    topic: {
        type: String
    },
    module: {
        type: String
    },
    objective: {
        type: String
    },
    pedagogy: {
        type: String
    },
    type: {
        type: String
    },
    unit: {
        type: String
    },
    content: {
        type: String
    },
    outcome: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    noofhours: {
        type: Number
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const Lessonplan=mongoose.model('Lessonplan',lessonplanschema);

module.exports=Lessonplan;

