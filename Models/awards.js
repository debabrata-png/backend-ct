const mongoose=require('mongoose');

const awardsschema = new mongoose.Schema({
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
    awardname: {
        type: String,
        required: [true,'Please enter name of the award/medal'],
        unique: false
    },
    awarddate: {
        type: Date,
    },
    eventname: {
        type: String,
    },
    position: {
        type: String,
    },
    engagementtype: {
        type: String,
        required: [true,'Please enter type of participation'],
        unique: false
    },
    level: {
        type: String,
        required: [true,'Please enter level'],
        unique: false
    },
    activitytype: {
        type: String,
        required: [true,'Please enter type of activity'],
        unique: false
    },
    studentname: {
        type: String,
        required: [true,'Please enter name of student'],
        unique: false
    },
    regno: {
        type: String
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
const StudentAwards=mongoose.model('StudentAwards',awardsschema);

module.exports=StudentAwards;

