const mongoose=require('mongoose');

const careercounselschema = new mongoose.Schema({
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
    activityname: {
        type: String,
        required: [true,'Please enter name of activity offered'],
        unique: false
    },
    studattd: {
        type: Number,
        required: [true,'Please enter number of students attended/participated'],
        unique: false
    },
    studplaced: {
        type: Number,
        required: [true,'Please enter number of students placed through campus palcement'],
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
const CareerCounselling=mongoose.model('CareerCounselling',careercounselschema);

module.exports=CareerCounselling;

