const mongoose=require('mongoose');

const nacademicschema = new mongoose.Schema({
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
    week: {
type: String
},
day: {
type: String
},
activitydate: {
type: Date
},
morning: {
type: String
},
afternoon: {
type: String
},
department: {
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
const nacademic=mongoose.model('nacademic',nacademicschema);

module.exports=nacademic;

