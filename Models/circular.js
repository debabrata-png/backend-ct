const mongoose=require('mongoose');

const circularschema = new mongoose.Schema({
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
    title: {
        type: String,
        required: [true,'Please enter Title'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter the Link'],
        unique: false
    },
    semester: {
        type: String,
        required: [true,'Please enter the Semester'],
        unique: false
    },
    section: {
        type: String,
        required: [true,'Please enter the Section'],
        unique: false
    },
    program: {
        type: String,
        required: [true,'Please enter the Program'],
        unique: false
    },

    programcode: {
        type: String
    },

    publisheddate: {
        type: Date,
        required: [true,'Please enter the Published Date'],
        unique: false
    },

    description: {
        type: String,
        required: [true,'Please enter the Description'],
        unique: false
    },
    status1: {
        type: String,
        required: [true,'Please enter the Status'],
        unique: false
    }
})
//
const Circular=mongoose.model('Circular',circularschema);

module.exports=Circular;

