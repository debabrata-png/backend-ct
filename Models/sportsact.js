const mongoose=require('mongoose');

const sportsactschema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: [true,'Please enter date of event/activity'],
        unique: false
    },
    title: {
        type: String,
        required: [true,'Please enter name of event/activity'],
        unique: false
    },
    sname: {
        type: String,
        required: [true,'Please enter name of student'],
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
const SportsActivities=mongoose.model('SportsActivities',sportsactschema);

module.exports=SportsActivities;

