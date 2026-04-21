const mongoose=require('mongoose');

const eventschema = new mongoose.Schema({
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
    noofparticipants: {
        type: Number
    },
    noofteachers: {
        type: Number
    },
    target: {
        type: String
    },
    fromto: {
        type: String
    },
    financial: {
        type: String
    },
    eventname: {
        type: String,
        required: [true,'Please enter name of event'],
        unique: false
    },
    
    description: {
        type: String,
        required: [true,'Please enter event description'],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    brochurelink: {
        type: String,
        required: [true,'Please enter link of brochure'],
        unique: false
    },
    date: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    time: {
        type: String,
        required: [true,'Please enter time'],
        unique: false
    },
    coordinator: {
        type: String,
        required: [true,'Please enter name of event coordinator'],
        unique: false
    },
    type: {
        type: String,
        required: [true,'Please enter the event type'],
        unique: false
    },
    academicyear: {
        type: String,
        required: [true,'Please enter the academic year'],
        unique: false
    },
    eventlink: {
        type: String,
        required: [true,'Please enter link of the event'],
        unique: false
    },
    status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const Event=mongoose.model('Event',eventschema);

module.exports=Event;

