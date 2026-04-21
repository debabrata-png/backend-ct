const mongoose=require('mongoose');

const timeslotsnschema = new mongoose.Schema({
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
    wday: {
type: String
},
period: {
type: String
},
starttime: {
type: Date
},
endtime: {
type: Date
},
program: {
type: String
},
semester: {
type: String
},
section: {
type: String
},
faculty: {
type: String
},
facultyid: {
type: String
},
course: {
type: String
},
slotstatus: {
type: String
},
room: {
type: String
},
capacity: {
type: Number
},
type: {
type: String
},
level: {
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
const timeslotsn=mongoose.model('timeslotsn',timeslotsnschema);

module.exports=timeslotsn;

