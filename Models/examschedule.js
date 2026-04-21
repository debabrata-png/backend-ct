const mongoose=require('mongoose');

const examscheduleschema = new mongoose.Schema({
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
type: String
},
exam: {
type: String
},
examcode: {
type: String
},
fromdate: {
type: Date
},
todate: {
type: Date
},
semester: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const examschedule=mongoose.model('examschedule',examscheduleschema);

module.exports=examschedule;

