const mongoose=require('mongoose');

const collabschema = new mongoose.Schema({
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
        required: [true,'Please enter activity title'],
        unique: false
    },
    agency: {
        type: String,
        required: [true,'Please enter name of the collaborative agency'],
        unique: false
    },
    participantname: {
        type: String,
        required: [true,'Please enter the name of participant'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter year of collaboration'],
        unique: false
    },
    
    duration: {
        type: String,
        required: [true,'Please enter the duration'],
        unique: false
    },
    
    activitynature: {
        type: String,
        required: [true,'Please enter the nature of activity'],
        unique: false
    }
})
//
const Collaboration=mongoose.model('collaboration',collabschema);

module.exports=Collaboration;

