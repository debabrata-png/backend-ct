
const mongoose=require('mongoose');

const dashboardschema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: [true,'Please enter date'],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter department'],
        unique: false
    },
    task: {
        type: String,
        required: [true,'Please enter task'],
        unique: false
    },
    percentage: {
        type: Number,
        required: [true,'Please enter perecntage of task completed'],
        unique: false
    },
    status: {
        type: String,
        required: [true,'Please enter status'],
        unique: false
    },
    link: {
        type: String
    },

    comments: {
        type: String,
        required: [true,'Please enter comments'],
        unique: false
    }
})
//
const Dashboard=mongoose.model('Dashboard',dashboardschema);

module.exports=Dashboard;