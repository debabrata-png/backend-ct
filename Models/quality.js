const mongoose=require('mongoose');

const qualityschema = new mongoose.Schema({
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
        required: [true,'Please enter year of signing MoU'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter type of quality initiative'],
        unique: false
    },
    action: {
        type: String,
        required: [true,'Please enter follow up action on academic administrative audit'],
        unique: false
    },
    
    instname: {
        type: String,
        required: [true,'Please enter name of collaborating institution'],
        unique: false
    },
    activity: {
        type: String,
        required: [true,'Please enter name of collaborating activity'],
        unique: false
    },
    startdate: {
        type: Date,
        required: [true,'Please enter start date for orientation program'],
        unique: false
    },
    enddate: {
        type: Date,
        required: [true,'Please enter end date for orientation program'],
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
const QualityAssurance=mongoose.model('QualityAssurance',qualityschema);

module.exports=QualityAssurance;

