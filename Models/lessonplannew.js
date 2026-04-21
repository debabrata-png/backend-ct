const mongoose=require('mongoose');

const lessonplannewschema = new mongoose.Schema({
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
    academicyear: {
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
semester: {
type: String
},
section: {
type: String
},
module: {
type: String
},
lessonno: {
type: Number
},
lesson: {
type: String
},
lessonplan: {
type: String
},
noofperiod: {
type: Number
},
fromdate: {
type: Date
},
todate: {
type: Date
},
actualdate: {
type: Date
},
topics: {
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
const lessonplannew=mongoose.model('lessonplannew',lessonplannewschema);

module.exports=lessonplannew;

