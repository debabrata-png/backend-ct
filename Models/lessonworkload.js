const mongoose=require('mongoose');

const lessonworkloadschema = new mongoose.Schema({
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
    course: {
        type: String
    },
    academicyear: {
        type: String
    },
    outcome: {
        type: String
    },
    content: {
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
const Lessonworkload=mongoose.model('Lessonworkload',lessonworkloadschema);

module.exports=Lessonworkload;

