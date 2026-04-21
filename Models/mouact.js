const mongoose=require('mongoose');

const mouactschema = new mongoose.Schema({
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
    organisation: {
        type: String,
        required: [true,'Please enter name of body with whom MoU is signed'],
        unique: false
    },
    bodyname: {
        type: String,
        required: [true,'Please enter name of institution/industry/corporate house'],
        unique: false
    },
    
    duration: {
        type: String,
        required: [true,'Please enter duration'],
        unique: false
    },
    activity: {
        type: String,
        required: [true,'Please enter name of activity'],
        unique: false
    },
    participants: {
        type: String,
        required: [true,'Please enter no.of students/teachers participation'],
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
const MoUActivities=mongoose.model('MoUActivities',mouactschema);

module.exports=MoUActivities;

