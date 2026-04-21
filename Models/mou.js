const mongoose=require('mongoose');

const mouschema = new mongoose.Schema({
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
    purpose: {
        type: String
    },
    bodyname: {
        type: String,
        required: [true,'Please enter name of body with whom MoU is signed'],
        unique: false
    },
    bodytype: {
        type: String,
        required: [true,'Please enter type of body'],
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
    link: {
        type: String,
        required: [true,'Please enter actual PO'],
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
const MoU=mongoose.model('MoU',mouschema);

module.exports=MoU;

