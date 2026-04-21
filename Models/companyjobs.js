const mongoose=require('mongoose');

const companyjobsschema = new mongoose.Schema({
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
    employerid: {
        type: String,
        required: [true,'Please enter id of employer'],
        unique: false
    },
    employername: {
        type: String,
        required: [true,'Please enter name of employer'],
        unique: false
    },
    designation: {
        type: String,
        required: [true,'Please enter designation'],
        unique: false
    },
    sector: {
        type: String,
        required: [true,'Please enter sector'],
        unique: false
    },
    website: {
        type: String,
        required: [true,'Please enter website'],
        unique: false
    },
    profile: {
        type: String,
        required: [true,'Please enter profile of employer'],
        unique: false
    },
    salary: {
        type: Number,
        required: [true,'Please enter salary'],
        unique: false
    },
    comments: {
        type: String,
        required: [true,'Please enter comments'],
        unique: false
    }
})
//
const Companyjobs=mongoose.model('Companyjobs',companyjobsschema);

module.exports=Companyjobs;

