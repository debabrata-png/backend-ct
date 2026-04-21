const mongoose=require('mongoose');

const abcschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
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
    semester: {
        type: String,
        required: [true,'Please enter semester'],
        unique: false
    },
    programcode: {
        type: String,
        required: [true,'Please enter programcode'],
        unique: false
    },
    program: {
        type: String,
        required: [true,'Please enter program'],
        unique: false
    },
    institution: {
        type: String,
        required: [true,'Please enter institution'],
        unique: false
    },
    othercourse: {
        type: String,
        required: [true,'Please enter othercourse'],
        unique: false
    },
    credit: {
        type: Number,
        required: [true,'Please enter credit'],
        unique: false
    },
    year: {
        type: Number
    },
    duration: {
        type: Number,
        required: [true,'Please enter duration'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    status: {
        type: String,
        required: [true,'Please enter status'],
        unique: false
    }
})
//
const Abc=mongoose.model('Abc',abcschema);

module.exports=Abc;

