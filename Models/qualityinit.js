const mongoose=require('mongoose');

const qualityinitschema = new mongoose.Schema({
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
        required: [true,'Please enter year '],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type of quality initiative'],
        unique: false
    },
    seminar: {
        type: String,
        required: [true,'Please enter name of seminar/conference/workshop'],
        unique: false
    },
    action: {
        type: String,
        required: [true,'Please enter follow up action on academic administrative audit'],
        unique: false
    },
    partstatus: {
        type: String,
        required: [true,'Please enter participation status in NIRF'],
        unique: false
    },
    other: {
        type: String,
        required: [true,'Please enter name of any other quality audit adopted'],
        unique: false
    },
    instname: {
        type: String,
        required: [true,'Please enter name of collaborating institution'],
        unique: false
    },
    
    date: {
        type: Date,
        required: [true,'Please enter date for orientation program'],
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
const QualityInitiative=mongoose.model('QualityInitiative',qualityinitschema);

module.exports=QualityInitiative;

