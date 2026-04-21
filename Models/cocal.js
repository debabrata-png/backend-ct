const mongoose=require('mongoose');

const cocalschema = new mongoose.Schema({
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
    coursecode: {
        type: String,
        required: [true,'Please enter Course Code'],
        unique: false
    },
    course: {
        type: String,
        required: [true,'Please enter Course'],
        unique: false
    },
    programcode: {
        type: String,
        required: [true,'Please enter the Program Code'],
        unique: false
    },
    program: {
        type: String,
        required: [true,'Please enter the Program'],
        unique: false
    },
    examcode: {
        type: String,
        required: [true,'Please enter the Exam Code'],
        unique: false
    },
    examname: {
        type: String,
        required: [true,'Please enter the Exam Name'],
        unique: false
    },
    semester: {
        type: String,
        required: [true,'Please enter the Semester'],
        unique: false
    },
    regno: {
        type: String,
        required: [true,'Please enter regno'],
        unique: false
    },
    student: {
        type: String,
        required: [true,'Please enter student'],
        unique: false
    },
  

    iamarks: {
        type: Number,
        required: [true,'Please enter the IA Marks'],
        unique: false
    },
    extmarks: {
        type: Number,
        required: [true,'Please enter the External Marks'],
        unique: false
    },

  
    totalmarks: {
        type: Number,
        required: [true,'Please enter the Total Marks'],
        unique: false
    },
    co1: {
        type: Number,
        required: [true,'Please enter the CO1'],
        unique: false
    },
    co2: {
        type: Number,
        required: [true,'Please enter the CO2'],
        unique: false
    },
    co3: {
        type: Number,
        required: [true,'Please enter the CO3'],
        unique: false
    },
})
//
const Cocalculation=mongoose.model('Cocalculation',cocalschema);

module.exports=Cocalculation;

