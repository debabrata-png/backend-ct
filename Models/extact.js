const mongoose=require('mongoose');

const extactschema = new mongoose.Schema({
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
    activityname: {
        type: String,
        required: [true,'Please enter name of the activity'],
        unique: false
    },
    orgunit: {
        type: String,
        required: [true,'Please enter name of organising unit/agency'],
        unique: false
    },
    scheme: {
        type: String,
        required: [true,'Please enter name of the scheme'],
        unique: false
    },
    year: {
        type: String,
        required: [true,'Please enter year of activity'],
        unique: false
    },
    noofstud: {
        type: String,
        required: [true,'Please enter number of students participation'],
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
const ExtensionActivity=mongoose.model('ExtensionActivity',extactschema);

module.exports=ExtensionActivity;

