const mongoose=require('mongoose');

const reservecatschema = new mongoose.Schema({
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
    year: {
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    programname: {
        type: String
    },
    programcode: {
        type: String
    },
    category: {
        type: String,
        required: [true,'Please enter the reserved category'],
        unique: false
    },
    sancseat: {
        type: String,
        required: [true,'Please enter number of sanctioned seats for reserved category'],
        unique: false
    },
    studadmt: {
        type: String,
        required: [true,'Please enter number of students admitted from reserved category'],
        unique: false
    },

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const ReservedCategory=mongoose.model('ReservedCategory',reservecatschema);

module.exports=ReservedCategory;

