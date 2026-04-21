const mongoose=require('mongoose');

const ictschema = new mongoose.Schema({
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
    classroom: {
        type: String,
        required: [true,'Please enter room number/name of classroom'],
        unique: false
    },
    seminarhall: {
        type: String,
        required: [true,'Please enter room number/name of seminar hall'],
        unique: false
    },
    facitype: {
        type: String,
        required: [true,'Please enter type of ICT facility'],
        unique: false
    },
    link: {
        type: String,
        required: [true,'Please enter link of geotagged photos'],
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
const ICT=mongoose.model('ICT',ictschema);

module.exports=ICT;

