const mongoose=require('mongoose');

const counsellorschema = new mongoose.Schema({
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
        required: [true,'Please enter year of appointment'],
        unique: false
    },
    counsellor: {
        type: String,
        required: [true,'Please enter name of academic counsellor '],
        unique: false
    },
    qualification: {
        type: String,
        required: [true,'Please enter highest qualification' ],
        unique: false
    },
    experience: {
        type: Number,
        required: [true,'Please enter total experience'],
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
const AcademicCounsellor=mongoose.model('AcademicCounsellor',counsellorschema);

module.exports=AcademicCounsellor;

